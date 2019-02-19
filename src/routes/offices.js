import { Router } from 'express';

import {
  createOffice,
  getAllOffices,
  getOffice,
  deleteOffice,
} from '../controllers/office';

const router = Router();

router.get('/offices', getAllOffices);
router.post('/offices', createOffice);
router.get('/offices/:id', getOffice);
router.delete('/offices/:id', deleteOffice);

export default router;
