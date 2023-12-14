import express from 'express';
import { PORT, MONGO_URL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';

const app = express();
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/books', booksRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to database', err);
  });
