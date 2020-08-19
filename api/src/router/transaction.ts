import express from 'express';
import { LoadAmount } from 'src/controller/transaction';

const TransactionRouter = express.Router();

TransactionRouter.post('/load', LoadAmount);

export default TransactionRouter;
