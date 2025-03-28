import express from 'express';
import { authenticateUser } from '../middleware/authentication.js';
import {
  register,
  verifyEmail,
  login,
  logout,
  checkLoginStatus
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.get('/logout', authenticateUser, logout);
router.get('/check-token', authenticateUser, checkLoginStatus);

export default router;
