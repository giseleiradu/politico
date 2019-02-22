import { Router } from 'express';
import checkToken from '../middlewares/checkToken';

import {
  getAllParties,
  getParty,
  createParty,
  updateParty,
  deleteParty,
} from '../controllers/party';

const router = Router();

router.get('/parties', checkToken, getAllParties);
router.post('/parties', checkToken, createParty);
router.get('/parties/:id', checkToken, getParty);
router.patch('/parties/:id/name', checkToken, updateParty);
router.delete('/parties/:id', checkToken, deleteParty);

export default router;
