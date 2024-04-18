import express from 'express';
import fileController from '../controllers/file.js'

const router = express.Router();

router.post('/avatar', fileController.uploadAvatar);

export default router;
