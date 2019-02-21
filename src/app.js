import express from 'express';
import morgan from 'morgan';
import middlewares from './middlewares';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
// Passing all of our APIs config/endpoints to our express app to use them

middlewares(app);

export default app;
