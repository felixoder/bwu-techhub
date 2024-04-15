import express from 'express'
import { createHack, deleteHack, getHacks } from '../controllers/hack.controller.js';
const router = express.Router();
import { verifyToken } from "../utils/verifyUser.js";

router.post('/create-hack',createHack);
router.get('/get-hack',getHacks);
router.delete('/delete-hack/:postId/:userId',deleteHack,verifyToken);


export default router