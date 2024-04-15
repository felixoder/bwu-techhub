import express from 'express'
import { createEvents, deleteEvents, getEvents } from '../controllers/event.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create-events',createEvents);
router.get('/get-events',getEvents);
router.delete('/delete-events/:postId/:userId',deleteEvents,verifyToken);
export default router;