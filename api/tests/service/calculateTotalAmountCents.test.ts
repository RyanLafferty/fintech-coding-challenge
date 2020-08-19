import CalculateTotalAmountCents from 'src/service/calculateTotalAmountCents';
import {
  SingleWeeklyTransaction,
  MaximumMultipleWeeklyTransactions,
} from 'tests/fixtures/transaction/weeklyTransactions';

describe('CalculateTotalAmountCents Service', () => {
  let service;

  const itCalculatesTotalAmountCents = (
    transactions: Array<TransactionInterface>,
    expected_amount_cents: bigint,
  ) => {
    beforeEach(() => {
      service = new CalculateTotalAmountCents(transactions);
    });

    it('calculates the total', () => {
      expect(service.call()).toEqual(expected_amount_cents);
    });
  };

  describe('when there are no transactions', () => {
    itCalculatesTotalAmountCents([], 0n);
  });

  describe('when there is a single transaction', () => {
    itCalculatesTotalAmountCents(SingleWeeklyTransaction(), 100n);
  });

  describe('when there are multiple transactions', () => {
    itCalculatesTotalAmountCents(MaximumMultipleWeeklyTransactions(), 2000000n);
  });
});
