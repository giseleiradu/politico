import express from 'express';
import morgan from 'morgan';
import middlewares from './middlewares';

const server = express();
server.use(morgan('dev'));
server.use(express.json());

// Passing all of our APIs config/endpoints to our express server to use them

middlewares(server);

export default server;
