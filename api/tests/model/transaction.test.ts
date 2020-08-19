import AmountValue from 'src/value/amount';
import Transaction from 'src/model/transaction';

describe('Transaction Model', () => {
  let amount;
  let model;
  let currentTime;

  beforeEach(() => {
    currentTime = new Date();

    amount = new AmountValue({
      load_amount: '$123.45',
    });

    model = new Transaction({
      id: '5678',
      customer_id: '1234',
      amount_cents: amount.amount_cents,
      is_debit: true,
      accepted: true,
      time: currentTime,
    });
  });

  describe('toInterface', () => {
    it('returns TransactionInterface', () => {
      expect(model.toInterface()).toEqual({
        id: '5678',
        customer_id: '1234',
        amount_cents: amount.amount_cents,
        is_debit: true,
        time: currentTime,
        accepted: true,
        created_at: model.created_at,
        updated_at: model.updated_at,
      });
    });
  });

  describe('toLoadAmountInterface', () => {
    describe('when is_debit is true', () => {
      it('returns LoadAmountInterface', () => {
        expect(model.toLoadAmountInterface()).toEqual({
          id: '5678',
          customer_id: '1234',
          load_amount: amount.load_amount,
          time: currentTime,
        });
      });
    });

    describe('when is_debit is false', () => {
      it('throws error', () => {
        model.is_debit = false;
        expect(() => { model.toLoadAmountInterface() })
          .toThrow('Cannot create load amount interface using a credit transaction');
      });
    });
  });


  describe('toLoadAmountResponseInterface', () => {
    describe('when is_debit is true', () => {
      it('returns TransactionResponseInterface', () => {
        expect(model.toLoadAmountResponseInterface()).toEqual({
          id: '5678',
          customer_id: '1234',
          accepted: true,
        });
      });
    });

    describe('when is_debit is false', () => {
      it('throws error', () => {
        model.is_debit = false;
        expect(() => { model.toLoadAmountResponseInterface() })
          .toThrow('Cannot create load amount response interface using a credit transaction');
      });
    });
  });
});
