import { Router } from 'express';

import {
  getAllParties,
  getParty,
  getAllOffices,
  getOffice,
  createParty,
  updateParty,
  deleteParty,
} from '../controllers/parties';

const router = Router();
const entry = '/parties';

// // /**** GET ALL ENTITIES ***/

router.get(`${entry}`, getAllParties);

// // /**** CREATE THE ENTITY /

router.post(`${entry}`, createParty);
router.post('/offices', createParty);



export default router;
