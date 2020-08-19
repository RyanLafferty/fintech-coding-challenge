export const EmptyDailyTransactions = [];

export const SingleDailyTransaction = (): TranscationInterface => {
  const currentTime = new Date();

  return [{
    id: '1',
    customer_id: '2',
    amount_cents: 100n,
    is_debit: true,
    time: currentTime,
    accepted: true,
    created_at: currentTime,
    updated_at: currentTime,
  }];
};

export const SingleMaximumDailyTransaction = (): TranscationInterface => {
  const currentTime = new Date();

  return [{
    id: '1',
    customer_id: '2',
    amount_cents: 500000n,
    is_debit: true,
    time: currentTime,
    accepted: true,
    created_at: currentTime,
    updated_at: currentTime,
  }];
};

export const MultipleDailyTransactions = (): TranscationInterface => {
  const currentTime = new Date();

  return [
    {
      id: '1',
      customer_id: '2',
      amount_cents: 100n,
      is_debit: true,
      time: currentTime,
      accepted: true,
      created_at: currentTime,
      updated_at: currentTime,
    },
    {
      id: '2',
      customer_id: '2',
      amount_cents: 100n,
      is_debit: true,
      time: currentTime,
      accepted: true,
      created_at: currentTime,
      updated_at: currentTime,
    },
  ];
};

export const MaximumDailyTransactions = (): TranscationInterface => {
  const currentTime = new Date();

  return [
    {
      id: '1',
      customer_id: '2',
      amount_cents: 100n,
      is_debit: true,
      time: currentTime,
      accepted: true,
      created_at: currentTime,
      updated_at: currentTime,
    },
    {
      id: '2',
      customer_id: '2',
      amount_cents: 100n,
      is_debit: true,
      time: currentTime,
      accepted: true,
      created_at: currentTime,
      updated_at: currentTime,
    },
    {
      id: '3',
      customer_id: '2',
      amount_cents: 100n,
      is_debit: true,
      time: currentTime,
      accepted: true,
      created_at: currentTime,
      updated_at: currentTime,
    },
  ];
};
