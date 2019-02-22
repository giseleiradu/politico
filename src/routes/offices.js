import { Router } from 'express';
import checkToken from '../middlewares/checkToken';

import {
  createOffice,
  getAllOffices,
  getOffice,
  deleteOffice,
} from '../controllers/office';

const router = Router();

router.get('/offices', checkToken, getAllOffices);
router.post('/offices', checkToken, createOffice);
router.get('/offices/:id', checkToken, getOffice);
router.delete('/offices/:id', checkToken, deleteOffice);

export default router;
