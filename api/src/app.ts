// polyfill hint for babel
import 'regenerator-runtime/runtime';
import express from 'express';
import TransactionRouter from 'src/router/transaction';

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.use('/transactions', TransactionRouter);
app.get('/', async (_req, res) => {
  res.send('Hello Typescript!');
});

app.listen(port, () => console.log(`server is listening on ${port}`));
