import cors from 'cors';
import express from 'express';
import 'dotenv/config';

const app = express();
const { PORT, CROSS_ORIGIN } = process.env;

app.use(cors({ origin: CROSS_ORIGIN }));

app.listen(PORT, () => {
  console.log(`This app is listening on port ${PORT}`);
});