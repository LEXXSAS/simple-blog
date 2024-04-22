import express from 'express';
import {userinfo} from '../controllers/user.js'
import { register, login, logout } from '../controllers/auth.js';
import authMiddleware from '../middlewares/auth-middleware.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/userinfo', authMiddleware, userinfo);
router.post('/logout', logout);

export default router;
