import express from 'express';
import { addTopper, getToppers , deleteToppers} from '../controllers/topper.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/add-topper',addTopper);
router.get('/get-topper',getToppers);
router.delete('/delete-topper/:postId/:userId',deleteToppers,verifyToken);



export default router;