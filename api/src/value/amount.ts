export class AmountValue {
  amount_cents: bigint;
  load_amount: string;

  constructor(amount: AmountInterface) {
    if (amount.load_amount != null) {
      const parsed_amount = parseFloat(amount.load_amount.replace('$',''));
      const amount_rounded = Math.round(parsed_amount * 100) / 100;
      const amount_rounded_cents = (amount_rounded * 100).toFixed(0);

      this.load_amount = amount.load_amount;
      this.amount_cents = BigInt(amount_rounded_cents);
    } else if (amount.amount_cents != null) {
      const amount_dollars = amount.amount_cents / 100n;
      const cents = amount.amount_cents % 100n;

      this.load_amount = `$${amount_dollars.toString()}.${cents.toString()}`;
      this.amount_cents = amount.amount_cents;
    } else {
      throw new Error('Either load_amount or amount_cents must be provided');
    }
  }

  toInterface = (): AmountInterface => {
    return {
      amount_cents: this.amount_cents,
      load_amount: this.load_amount,
    };
  }


}

export default AmountValue;
