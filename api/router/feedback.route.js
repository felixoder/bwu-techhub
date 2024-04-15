import express from 'express'
import { createFeed, deleteFeedbacks, getFeedbacks } from '../controllers/feedback.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create-feedback',createFeed);
router.get('/get-feedback',getFeedbacks);
router.delete('/delete-feedback/:postId/:userId',deleteFeedbacks,verifyToken);

export default router
