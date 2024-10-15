import express from 'express';
import { authenticateUser } from '../middleware/authentication';
import {
  getCart,
  addCartItem,
  removeCartItem,
  updateCartItem,
} from '../controllers/cartController';

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