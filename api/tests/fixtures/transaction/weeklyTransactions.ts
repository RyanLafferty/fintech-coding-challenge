export const EmptyWeeklyTransactions = [];

export const SingleWeeklyTransaction = (): TranscationInterface => {
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

export const MultipleWeeklyTransactions = (): TranscationInterface => {
  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const distanceFromMonday = 1 - currentDay;
  const weekStart = new Date(
    Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getDate() + distanceFromMonday, 0, 0, 0)
  );
  const weekEnd = new Date(
    Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), weekStart.getDate() + 7, 23, 59, 59)
  );

  return [
    {
      id: '1',
      customer_id: '2',
      amount_cents: 250000n,
      is_debit: true,
      time: weekStart,
      accepted: true,
      created_at: weekStart,
      updated_at: weekStart,
    },
    {
      id: '2',
      customer_id: '2',
      amount_cents: 250000n,
      is_debit: true,
      time: weekEnd,
      accepted: true,
      created_at: weekEnd,
      updated_at: weekEnd,
    },
  ];
};

export const MaximumMultipleWeeklyTransactions = (): TranscationInterface => {
  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const distanceFromMonday = 1 - currentDay;
  const weekStart = new Date(
    Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getDate() + distanceFromMonday, 0, 0, 0)
  );
  const weekEnd = new Date(
    Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), weekStart.getDate() + 7, 23, 59, 59)
  );

  return [
    {
      id: '1',
      customer_id: '2',
      amount_cents: 1000000n,
      is_debit: true,
      time: weekStart,
      accepted: true,
      created_at: weekStart,
      updated_at: weekStart,
    },
    {
      id: '2',
      customer_id: '2',
      amount_cents: 1000000n,
      is_debit: true,
      time: weekEnd,
      accepted: true,
      created_at: weekEnd,
      updated_at: weekEnd,
    },
  ];
};
