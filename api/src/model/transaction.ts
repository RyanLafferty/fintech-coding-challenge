import AmountValue from 'src/value/amount';
import Base from './base';

export class Transaction extends Base implements TransactionInterface {
  id: string;
  customer_id: string;
  amount_cents: bigint;
  is_debit: boolean;
  time: Date;
  accepted: boolean;

  constructor(transaction_data: TransactionInterface) {
    super('transactions', `${transaction_data.customer_id}-${transaction_data.id}`);

    this.id = transaction_data.id;
    this.customer_id = transaction_data.customer_id;
    this.amount_cents = transaction_data.amount_cents;
    this.is_debit = transaction_data.is_debit;
    this.time = transaction_data.time;
    this.accepted = transaction_data.accepted;
  }

  save = async(): Promise<void> => {
    this.updated_at = new Date();
    await this.collection.doc(this.document_id).set({
      id: this.id,
      customer_id: this.customer_id,
      amount_cents: this.amount_cents,
      is_debit: this.is_debit,
      accepted: this.accepted,
      time: this.time,
      created_at: this.created_at,
      updated_at: this.updated_at,
    });
  };

  toInterface = (): TransactionInterface => {
    return {
      id: this.id,
      customer_id: this.customer_id,
      amount_cents: this.amount_cents,
      is_debit: this.is_debit,
      time: this.time,
      accepted: this.accepted,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  };

  toLoadAmountInterface = (): LoadAmountInterface => {
    if (this.is_debit) {
      return {
        id: this.id,
        customer_id: this.customer_id,
        load_amount: new AmountValue({amount_cents: this.amount_cents}).load_amount,
        time: this.time,
      };
    } else {
      throw new Error('Cannot create load amount interface using a credit transaction');
    }
  };

  toLoadAmountResponseInterface = (): TransactionResponseInterface => {
    if (this.is_debit) {
      return {
        id: this.id,
        customer_id: this.customer_id,
        accepted: this.accepted,
      };
    } else {
      throw new Error('Cannot create load amount response interface using a credit transaction');
    }
  }
}

export default Transaction;
