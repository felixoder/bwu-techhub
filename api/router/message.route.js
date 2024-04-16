import express from 'express'
import { createMessage, getMessage } from '../controllers/message.controller.js';
const router = express.Router();

router.post('/create-message',createMessage);
router.get('/get-message',getMessage);


export default router;