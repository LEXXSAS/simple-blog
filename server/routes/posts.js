import express from 'express';
import { addPost, deletePost, getPost, getPosts, updatePost, getCount, nextPage, prevPage, getMenuPosts } from '../controllers/post.js';

const router = express.Router();

router.get('/count', getCount);
router.get('/nextpage', nextPage);
router.get('/previouspage', prevPage);
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/currentpost', getMenuPosts);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default router;
