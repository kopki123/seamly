import express from 'express';
import { authenticateUser } from '../middleware/authentication.js';
import {
  getUserInfo
} from '../controllers/userController.js';

const router = express.Router();

router.get('/info', authenticateUser, getUserInfo);

export default router;
