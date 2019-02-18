// // import { Router } from 'express';
// //
// // import {
// //   getAllParties,
// //   getParty,
// //   getAllOffices,
// //   getOffice,
// //   createParty,
// //   updateParty,
// //   deleteParty,
// // } from '../controllers/parties';
// //
// // const router = Router();
// // const entry = '/parties';
// //
// // // // /**** GET ALL ENTITIES ***/
// //
// // router.get(`${entry}`, getAllParties);
// //
// // // // /**** CREATE THE ENTITY /
// //
// // router.post(`${entry}`, createParty);
// // router.post('/offices', createParty);
// //
// // /**** GET THE ENTITY BY ID **********/
// //
// // router.get(`${entry}/:id`, getParty);
// //
// // // // /**** UPDATE THE ENTITY /
// //
// // router.patch(`${entry}/:id`, updateParty);
// //
// //
// // // // /**** DELETE THE ENTITY /
// //
// // router.delete(`${entry}/:id`, deleteParty);
// //
// //
// // export default router;
//
//
//
//
// import { Router } from 'express';
//
// import {
//   getAllParties,
//   getParty,
//   getAllOffices,
//   getOffice,
//   createParty,
//   updateParty,
//   deleteParty,
//   createOffice,
// } from '../controllers/parties';
//
// const router = Router();
// const entry = '/parties';
//
// // // /** GET ALL ENTITIES */
//
// router.get(`${entry}`, getAllParties);
// router.get('/offices', getAllOffices);
//
// // // /** CREATE THE ENTITY /
//
// router.post(`${entry}`, createParty);
// router.post('/offices', createOffice);
//
// /* * GET THE ENTITY BY ID *** */
//
// router.get(`${entry}/:id`, getParty);
// router.get('/offices/:id', getOffice);
//
// // // /** UPDATE THE ENTITY /
//
// router.patch(`${entry}/:id`, updateParty);
//
//
// // // /** DELETE THE ENTITY /
//
// router.delete(`${entry}/:id`, deleteParty);
//
//
// export default router;



import { Router } from 'express';

import {
  getAllParties,
  getParty,
  getAllOffices,
  getOffice,
  createParty,
  updateParty,
  deleteParty,
  createOffice,
} from '../controllers/parties';

const router = Router();

// // /** GET ALL ENTITIES */

router.get('/parties', getAllParties);
router.get('/offices', getAllOffices);

// // /** CREATE THE ENTITY /

router.post('/parties', createParty);
router.post('/offices', createOffice);

/* * GET THE ENTITY BY ID *** */

router.get('/parties/:id', getParty);
router.get('/offices/:id', getOffice);

// // /** UPDATE THE ENTITY /

router.patch('/parties/:id', updateParty);


// // /** DELETE THE ENTITY /

router.delete('/parties:id', deleteParty);


export default router;
