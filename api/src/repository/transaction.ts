import {
  QuerySnapshot,
  DocumentSnapshot,
} from '@google-cloud/firestore';
import Base from './base';

export class TransactionRepository extends Base {
  constructor() {
    super('transactions');
  }

  fetchTransaction = async (id: string): Promise<TransactionInterface | undefined> => {
    const transactionDocument: DocumentSnapshot = await this.collection.doc(id).get();
    const transactionData = transactionDocument.data();

    if (transactionData != undefined) {
      return <TransactionInterface> transactionData;
    }

    return undefined;
  };

  fetchDailyDebitTransactions = async (customer_id: string, time: Date): Promise<Array<TransactionInterface>> => {
    const year = time.getUTCFullYear();
    const month = time.getUTCMonth();
    const date = time.getUTCDate();

    const todayStart = new Date(Date.UTC(year, month, date, 0, 0, 0));
    const todayEnd = new Date(Date.UTC(year, month, date, 23, 59, 59));

    const transactionsCollection: QuerySnapshot = await this.collection
      .where('customer_id', '==', customer_id)
      .where('accepted', '==', true)
      .where('is_debit', '==', true)
      .where('time', '>=', todayStart)
      .where('time', '<=', todayEnd)
      .get();

    return transactionsCollection.docs.map(
      transaction => {
        const transactionData: TransactionInterface = <TransactionInterface> transaction.data();
        return this.serializeTransactionData(transaction.id, transactionData);
      }
    );
  };

  fetchWeeklyDebitTransactions = async (customer_id: string, time: Date): Promise<Array<TransactionInterface>> => {
    const year = time.getUTCFullYear();
    const month = time.getUTCMonth();
    const currentDay = time.getDay();
    const distanceFromMonday = 1 - currentDay;
    const weekStart = new Date(Date.UTC(year, month, time.getDate() + distanceFromMonday, 0, 0, 0));
    const weekEnd = new Date(Date.UTC(year, month, weekStart.getDate() + 7, 23, 59, 59));

    const transactionsCollection: QuerySnapshot = await this.collection
      .where('customer_id', '==', customer_id)
      .where('accepted', '==', true)
      .where('is_debit', '==', true)
      .where('time', '>=', weekStart)
      .where('time', '<=', weekEnd)
      .get();

    return transactionsCollection.docs.map(
      transaction => {
        const transactionData: TransactionInterface = <TransactionInterface> transaction.data();
        return this.serializeTransactionData(transaction.id, transactionData);
      }
    );
  };

  fetchAllTransactions = async (): Promise<Array<TransactionInterface>> => {
    const transactionsCollection: QuerySnapshot = await this.collection.get();

    return transactionsCollection.docs.map(
      transaction => {
        const transactionData: TransactionInterface = <TransactionInterface> transaction.data();
        return this.serializeTransactionData(transaction.id, transactionData);
      }
    );
  };

  private serializeTransactionData = (
    transactionId: string, transactionData: TransactionInterface
  ): TransactionInterface => {
    return {
      id: transactionId,
      customer_id: transactionData.customer_id,
      amount_cents: BigInt(transactionData.amount_cents),
      is_debit: transactionData.is_debit,
      time: transactionData.time,
      accepted: transactionData.accepted,
      created_at: transactionData.created_at,
      updated_at: transactionData.updated_at,
    };
  };
}

export default TransactionRepository;
