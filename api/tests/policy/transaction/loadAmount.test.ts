import LoadAmountPolicy from 'src/policy/transaction/loadAmount';
import {
  SingleDailyTransaction,
  SingleMaximumDailyTransaction,
  MultipleDailyTransactions,
  MaximumDailyTransactions,
} from 'tests/fixtures/transaction/dailyTransactions';
import {
  MultipleWeeklyTransactions,
  MaximumMultipleWeeklyTransactions,
} from 'tests/fixtures/transaction/weeklyTransactions';


let mockDailyTransactions = [];
let mockWeeklyTransactions = [];

const mockFetchDailyDebitTransactions = jest.fn().mockImplementation(() => mockDailyTransactions);
const mockFetchWeeklyDebitTransactions = jest.fn().mockImplementation(() => mockWeeklyTransactions);

jest.mock('src/repository/transaction', () => jest.fn().mockImplementation(() => ({
  fetchDailyDebitTransactions: mockFetchDailyDebitTransactions,
  fetchWeeklyDebitTransactions: mockFetchWeeklyDebitTransactions,
})));

describe('Load Amount Policy', () => {
  const id = '1234';
  const customer_id = '5678';
  const load_amount = '$123.45';
  const time = new Date();
  const load_amount_payload = {
    id,
    customer_id,
    load_amount,
    time,
  };
  let policy;

  const itFetchesDailyTransactions = (load_amount_payload: LoadAmountInterface) => {
    beforeEach(() => {
      policy = new LoadAmountPolicy(load_amount_payload);
    });

    it('fetches daily transactions', (done) => {
      policy.call().then(() => {
        expect(mockFetchDailyDebitTransactions.mock.calls).toEqual([[customer_id, time]]);
        done();
      });
    });
  };

  const itFetchesWeeklyTransactions = (load_amount_payload: LoadAmountInterface) => {
    beforeEach(() => {
      policy = new LoadAmountPolicy(load_amount_payload);
    });

    it('fetches daily transactions', (done) => {
      policy.call().then(() => {
        expect(mockFetchWeeklyDebitTransactions.mock.calls).toEqual([[customer_id, time]]);
        done();
      });
    });
  };

  const itApprovesPolicy = (load_amount_payload: LoadAmountInterface) => {
    beforeEach(() => {
      policy = new LoadAmountPolicy(load_amount_payload);
    });

    itFetchesDailyTransactions(load_amount_payload);

    it('approves policy', (done) => {
      policy.call().then((result) => {
        expect(result).toEqual(true);
        done();
      });
    });
  };

  const itDeniesPolicy = (load_amount_payload: LoadAmountInterface, reason: string) => {
    beforeEach(() => {
      policy = new LoadAmountPolicy(load_amount_payload);
    });

    itFetchesDailyTransactions(load_amount_payload);

    it('denies policy', (done) => {
      policy.call().then((result) => {
        expect(result).toEqual(false);
        done();
      });
    });

    it('sets reason', (done) => {
      policy.call().then(() => {
        expect(policy.reason).toEqual(reason);
        done();
      });
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when there are no previous transactions', () => {
    itApprovesPolicy(load_amount_payload);
  });

  describe('when there is a previous daily transaction', () => {
    describe('when the daily load limit has not been reached', () => {
      beforeAll(() => {
        mockDailyTransactions = SingleDailyTransaction();
        mockWeeklyTransactions = [];
      });

      itApprovesPolicy(load_amount_payload);
    });

    describe('when the daily load limit has been reached', () => {
      beforeAll(() => {
        mockDailyTransactions = SingleMaximumDailyTransaction();
        mockWeeklyTransactions = [];
      });

      itDeniesPolicy(load_amount_payload, 'Load would exceed daily maximum');
    });
  });

  describe('when there is multiple daily transactions', () => {
    describe('when the maxiumum number daily transactions has not been reached', () => {
      beforeAll(() => {
        mockDailyTransactions = MultipleDailyTransactions();
        mockWeeklyTransactions = [];
      });

      itApprovesPolicy(load_amount_payload);
    });

    describe('when the maxiumum number daily transactions has been reached', () => {
      beforeAll(() => {
        mockDailyTransactions = MaximumDailyTransactions();
        mockWeeklyTransactions = [];
      });
  
      itDeniesPolicy(load_amount_payload, 'Maximum number of daily loads reached');
    });
  });

  describe('when there is multiple weekly transactions', () => {
    describe('when the maxiumum weekly load limit has not been reached', () => {
      beforeAll(() => {
        mockDailyTransactions = [];
        mockWeeklyTransactions = MultipleWeeklyTransactions();
      });

      itFetchesWeeklyTransactions(load_amount_payload);
      itApprovesPolicy(load_amount_payload);
    });

    describe('when the maxiumum weekly load limit has been reached', () => {
      beforeAll(() => {
        mockDailyTransactions = [];
        mockWeeklyTransactions = MaximumMultipleWeeklyTransactions();
      });
  
      itFetchesWeeklyTransactions(load_amount_payload);
      itDeniesPolicy(load_amount_payload, 'Load would exceed weekly maximum');
    });
  });
});
