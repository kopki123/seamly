import express from 'express';
import { authenticateUser } from '../middleware/authentication.js';
import {
  getCart,
  addCartItem,
  removeCartItem,
  updateCartItem,
} from '../controllers/cartController.js';

const router = express.Router();

router
  .route('/')
  .get(authenticateUser, getCart)
  .post(authenticateUser, addCartItem);

router
  .route('/:id')
  .delete(authenticateUser, removeCartItem)
  .patch(authenticateUser, updateCartItem);


export default router;