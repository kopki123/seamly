import express from 'express';
import { authenticateUser } from '../middleware/authentication.js';
import {
  checkout,
  checkoutReturn,
} from '../controllers/checkoutController.js';

const router = express.Router();

router.route('/:id').get(authenticateUser, checkout);
// 後端接收綠界回傳的資料
router.route('/return/:id').post(authenticateUser, checkoutReturn);

export default router;