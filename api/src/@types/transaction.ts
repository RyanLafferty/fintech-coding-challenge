interface AmountInterface {
  load_amount?: string,
  amount_cents?: bigint,
}

interface LoadAmountInterface {
  id: string,
  customer_id: string,
  load_amount: string,
  time: Date,
}

interface TransactionInterface {
  id: string,
  customer_id: string,
  amount_cents: bigint,
  is_debit: boolean,
  time: Date,
  accepted: boolean,
  created_at?: Date,
  updated_at?: Date,
}

interface TransactionResponseInterface {
  id: string,
  customer_id: string,
  accepted: boolean,
}
