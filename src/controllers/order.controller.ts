import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import * as orderService from '../services/order.service.js';
import apiResponse from '../utils/apiResponse.js';
import checkPermissions from '../utils/checkPermissions.js';

const getUserOrders = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const orders = await orderService.getUserOrders(userId);

  res.status(StatusCodes.OK).json(apiResponse({ data: { orders } }));
};

const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await orderService.getOrderById(id);
  checkPermissions(req.user, order.userId);

  res.status(StatusCodes.OK).json(apiResponse({ data: { order } }));
};

const createOrder = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const order = await orderService.createOrder({ userId, ...req.body });

  res.status(StatusCodes.OK).json(apiResponse({ data: { order } }));
};

const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  await orderService.deleteOrder(id);

  res.status(StatusCodes.OK).json(apiResponse());
};

const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isPaid } = req.body;

  const updatedOrder = await orderService.updateOrderStatus({ orderId: id, isPaid });

  res.status(StatusCodes.OK).json(apiResponse({ data: { order: updatedOrder } }));
};

export {
  getUserOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrderStatus,
};