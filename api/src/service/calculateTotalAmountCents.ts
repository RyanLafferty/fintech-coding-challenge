import ServiceBase from 'src/service/base';

export class CalculateTotalAmountCents extends ServiceBase {
  private _transactionsData: Array<TransactionInterface>;

  constructor(transactionsData: Array<TransactionInterface>) {
    super();

    this._transactionsData = transactionsData;
  }

  call = (): bigint => {
    const totalAmountCents = this._transactionsData.reduce((totalAmountCents, transaction) => {
      return totalAmountCents + transaction.amount_cents;
    }, 0n);

    return totalAmountCents;
  }
}

export default CalculateTotalAmountCents;
