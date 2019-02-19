import express, { Router } from 'express';
// import all of your routes from their files
import partiesRoute from './parties';
import officesRoute from './offices';

const routes = Router();

/* **** API ENTRYPOINT ********** */

const entryPoint = Router();
entryPoint.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome' });
});

/* **** UPLOADS ENDPOINT ********** */

const uploads = ('/uploads', express.static('uploads'));

/* **** ALL ENDPOINTS ********** */

routes.use(entryPoint, partiesRoute, uploads);
routes.use(entryPoint, officesRoute, uploads);

export default routes;
