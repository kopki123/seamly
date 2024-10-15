import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { UnauthorizedError } from '../errors/index.js';
import * as cartService from '../services/cartService.js';
import apiResponse from '../utils/apiResponse.js';

const getCart = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const cart = await cartService.getCart(userId);

  res.status(StatusCodes.OK).json(apiResponse({ data: { cart } }));
};

const addCartItem = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;
  await cartService.addToCart({ productId, quantity, userId });

  res.status(StatusCodes.OK).json(apiResponse());
};

const updateCartItem = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { id } = req.params;
  const { quantity } = req.body;

  const isOwnedByUser = await cartService.isCartItemOwnedByUser(userId, id);
  if (!isOwnedByUser) {
    throw new UnauthorizedError('無權限刪除該商品');
  }

  const updatedItem = await cartService.updateCartItem({ quantity, cartItemId: id, userId });
  res.status(StatusCodes.OK).json(apiResponse({ data: { cartItem: updatedItem } }));
};

const removeCartItem = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { id } = req.params;

  const isOwnedByUser = await cartService.isCartItemOwnedByUser(userId, id);
  if (!isOwnedByUser) {
    throw new UnauthorizedError('無權限刪除該商品');
  }

  await cartService.removeCartItem({ cartItemId: id, userId });

  res.status(StatusCodes.OK).json(apiResponse());
};

export {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem
};