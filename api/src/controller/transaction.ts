import express from 'express';
import AmountValue from 'src/value/amount';
import Transaction from 'src/model/transaction';
import TransactionRepository from 'src/repository/transaction';
import LoadAmountPolicy from 'src/policy/transaction/loadAmount';

export const LoadAmount = async (req:express.Request, res:express.Response): Promise<void> => {
  const transaction_document_id = `${req.body['customer_id']}-${req.body['id']}`;
  const repo = new TransactionRepository();
  const existing_transaction = await repo.fetchTransaction(transaction_document_id);
  
  if(existing_transaction != undefined) {
    res.status(204).end();
  } else {
    const amount = new AmountValue({
      load_amount: req.body['load_amount']
    });
    const transaction = new Transaction({
      id: req.body['id'],
      customer_id: req.body['customer_id'],
      amount_cents: amount.amount_cents,
      is_debit: true,
      accepted: false,
      time: new Date(req.body['time']),
    });

    const load_amount_policy_result = await new LoadAmountPolicy(transaction.toLoadAmountInterface()).call();
    transaction.accepted = load_amount_policy_result;
    transaction.save();

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(transaction.toLoadAmountResponseInterface()));
  }
};
