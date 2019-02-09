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


// // /**** CREATE THE ENTITY /

router.post(`${entry}`, createParty);
router.post('/offices', createParty);


export default router;
