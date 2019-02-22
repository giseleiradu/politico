import express, { Router } from 'express';

import partiesRoute from './parties';
import officesRoute from './offices';
import usersRoute from './users';
import candidateRoute from './candidate';

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
routes.use(entryPoint, candidateRoute);

export default routes;
