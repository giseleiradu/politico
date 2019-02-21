import express from 'express';
import User from '../controllers/User';

const router = express.Router();

router.post('/auth/signup', User.signup);
router.post('/auth/login', User.login);

export default router;
