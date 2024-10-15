import express from 'express';
import { authenticateUser } from '../middleware/authentication';
import {
  getUserInfo
} from '../controllers/userController';

const router = express.Router();

router.get('/info', authenticateUser, getUserInfo);

export default router;
