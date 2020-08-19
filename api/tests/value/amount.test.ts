import AmountValue from 'src/value/amount';

describe('Amount Value', () => {
  const itInitializesAttributes = (
    amount: AmountInterface,
    expected_load_amount: string,
    expected_amount_cents: bigint,
  ) => {
    const amountValue = new AmountValue(amount);

    it('initializes load_amount', () => {
      expect(amountValue.load_amount).toEqual(expected_load_amount);
    });

    it('initializes amount_cents', () => {
      expect(amountValue.amount_cents).toEqual(expected_amount_cents);
    });

    it('returns interface', () => {
      expect(amountValue.toInterface()).toEqual({
        load_amount: expected_load_amount,
        amount_cents: expected_amount_cents,
      });
    });
  }

  describe('when load_amount is provided', () => {
    const load_amount = '$123.45';
    const expected_amount_cents = 12345n;

    itInitializesAttributes(
      {
        load_amount,
        amount_cents: undefined,
      },
      load_amount,
      expected_amount_cents,
    );
  });

  describe('when amount_cents is provided', () => {
    const amount_cents = 12345n;
    const expected_load_amount = '$123.45';

    itInitializesAttributes(
      {
        load_amount: undefined,
        amount_cents,
      },
      expected_load_amount,
      amount_cents,
    );
  });

  describe('when no arguments are provided', () => {
    it('throws error', () => {
      expect(() => { new AmountValue({}) }).toThrow('Either load_amount or amount_cents must be provided');
    });
  });
});
