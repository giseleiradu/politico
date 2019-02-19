import { Router } from 'express';

import {
  getAllParties,
  getParty,
  createParty,
  updateParty,
  deleteParty,
} from '../controllers/party';

const router = Router();

router.get('/parties', getAllParties);
router.post('/parties', createParty);
router.get('/parties/:id', getParty);
router.patch('/parties/:id', updateParty);
router.delete('/parties/:id', deleteParty);

export default router;
