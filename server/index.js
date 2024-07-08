import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import usersRouter from './routes/users.js';

const app = express();
const { PORT, CROSS_ORIGIN } = process.env;

app.use(cors({ origin: CROSS_ORIGIN }));
app.use(express.json());
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`This app is listening on port ${PORT}`);
});