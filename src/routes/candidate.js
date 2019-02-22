import express from 'express';
import Candidate from '../controllers/Candidate';

const router = express.Router();

router.post('/office/:id/register', Candidate.candidateReg);

export default router;
