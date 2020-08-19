import TransactionRepository from 'src/repository/transaction';
import AmountValue from 'src/value/amount';
import CalculateTotalAmountCents from 'src/service/calculateTotalAmountCents';
import PolicyBase from 'src/policy/base';

/*
  Policy Rules:
    1. A maximum of 3 loads can be performed per day regardless of the amount
    2. A maximum of $5,000 can be loaded per day
    3. A maximum of $20,000 can be loaded per week
*/

export class LoadAmountPolicy extends PolicyBase {
  protected customer_id: string;
  protected time: Date;
  protected amount_cents: bigint;
  private _transactionRepository: TransactionRepository;
  private _dailyDebitTransactions: Array<TransactionInterface>;
  private _weeklyDebitTransactions: Array<TransactionInterface>;
  private _totalDailyLoads: number;
  private _totalDailyLoadAmountCents: bigint;
  private _totalWeeklyLoadAmountCents: bigint;

  constructor(load_amount_payload: LoadAmountInterface) {
    super();

    this.customer_id = load_amount_payload.customer_id;
    this.time = load_amount_payload.time;
    this.amount_cents = new AmountValue({
      load_amount: load_amount_payload.load_amount,
    }).amount_cents;
  }

  call = async (): Promise<boolean> => {
    if (await this.totalDailyLoads() >= 3) {
      this.deny('Maximum number of daily loads reached');
      return false;
    }

    if (await this.totalDailyLoadAmountCents() + this.amount_cents > 500000n) {
      this.deny('Load would exceed daily maximum');
      return false;
    }

    if (await this.totalWeeklyLoadAmountCents() + this.amount_cents > 2000000n) {
      this.deny('Load would exceed weekly maximum');
      return false;
    }

    return this.isApproved();
  }

  private transactionRepository = (): TransactionRepository => {
    if (this._transactionRepository != null) {
      return this._transactionRepository;
    }

    this._transactionRepository = new TransactionRepository();
    return this._transactionRepository
  }

  private dailyDebitTransactions = async (): Promise<Array<TransactionInterface>> => {
    if (this._dailyDebitTransactions != null) {
      return this._dailyDebitTransactions;
    }

    this._dailyDebitTransactions = await this.transactionRepository().fetchDailyDebitTransactions(
      this.customer_id,
      this.time,
    );
    return this._dailyDebitTransactions;
  }

  private weeklyDebitTransactions = async (): Promise<Array<TransactionInterface>> => {
    if (this._weeklyDebitTransactions != null) {
      return this._weeklyDebitTransactions;
    }

    this._weeklyDebitTransactions = await this.transactionRepository().fetchWeeklyDebitTransactions(
      this.customer_id,
      this.time,
    );
    return this._weeklyDebitTransactions;
  }

  private totalDailyLoads = async (): Promise<number> => {
    if (this._totalDailyLoads != null) {
      return this._totalDailyLoads;
    }

    this._totalDailyLoads = (await this.dailyDebitTransactions()).length;
    return this._totalDailyLoads;
  }

  private totalDailyLoadAmountCents = async (): Promise<bigint> => {
    if (this._totalDailyLoadAmountCents != null) {
      return this._totalDailyLoadAmountCents;
    }

    this._totalDailyLoadAmountCents = new CalculateTotalAmountCents(await this.dailyDebitTransactions()).call();
    return this._totalDailyLoadAmountCents;
  }

  private totalWeeklyLoadAmountCents = async (): Promise<bigint> => {
    if (this._totalWeeklyLoadAmountCents != null) {
      return this._totalWeeklyLoadAmountCents;
    }

    this._totalWeeklyLoadAmountCents = new CalculateTotalAmountCents(await this.weeklyDebitTransactions()).call();
    return this._totalWeeklyLoadAmountCents;
  }
}

export default LoadAmountPolicy;
