import express from 'express';
import { authenticateUser } from '../middleware/authentication.js';
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus
} from '../controllers/order.controller.js';

const router = express.Router();

router
  .route('/')
  .get(authenticateUser, getUserOrders)
  .post(authenticateUser, createOrder);

router
  .route('/:id')
  .get(authenticateUser, getOrderById)
  .delete(authenticateUser, deleteOrder)
  .patch(authenticateUser, updateOrderStatus);

export default router;