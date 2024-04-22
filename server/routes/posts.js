import express from 'express';
import { addPost, deletePost, getPost, getPosts, updatePost, getCount, nextPage, prevPage, getMenuPosts } from '../controllers/post.js';
import authMiddleware from '../middlewares/auth-middleware.js'

const router = express.Router();

router.get('/count', getCount);
router.get('/nextpage', nextPage);
router.get('/previouspage', prevPage);
router.get('/',  getPosts);
router.get('/:id', getPost);
router.get('/currentpost', getMenuPosts);
router.post('/', authMiddleware, addPost);
router.delete('/:id', authMiddleware, deletePost);
router.put('/:id', authMiddleware, updatePost);

export default router;
