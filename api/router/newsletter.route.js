import express from 'express'
import { createNewsletters, deleteNewsLetters, getNewsletters } from '../controllers/newsletter.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create-newsletters',createNewsletters);
router.get('/get-newsletters',getNewsletters);
router.delete('/delete-newsletters/:postId/:userId',deleteNewsLetters,verifyToken);

export default router;