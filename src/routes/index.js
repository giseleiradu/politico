import express, { Router } from 'express';
// import all of your routes from their files
import partiesRoute from './parties';
import officesRoute from './offices';
import usersRoute from './users';

const routes = Router();

/* ** API ENTRYPOINT **** */

const entryPoint = Router();
entryPoint.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome' });
});


/* ** ALL ENDPOINTS **** */

routes.use(entryPoint, partiesRoute);
routes.use(entryPoint, officesRoute);
routes.use(entryPoint, usersRoute);

export default routes;
