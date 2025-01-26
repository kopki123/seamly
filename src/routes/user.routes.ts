import express from 'express';
import { authenticateUser } from '../middleware/authentication.js';
import {
  getUserInfo
} from '../controllers/user.controller.js';

const router = express.Router();

router
  .route('/info')
  .get(authenticateUser, getUserInfo);

export default router;
