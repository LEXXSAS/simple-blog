import express from 'express';
import fileController from '../controllers/file.js'
import authMiddleware from '../middlewares/auth-middleware.js'

const router = express.Router();

router.post('/avatar', authMiddleware, fileController.uploadAvatar);

export default router;
