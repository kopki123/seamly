import prisma from '../prisma/prisma-client.js';
import Joi from 'joi';
import { OrderInput } from '../models/OrderInputModel.js';
import { BadRequestError } from '../errors/index.js';

const orderSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().trim().pattern(/^[\u4e00-\u9fffa-zA-Z0-9]{1,10}$/).required(),
  phone: Joi.string().trim().pattern(/^09\d{8}$/).required(),
  payMethod: Joi.string().required(),
  pickMethod: Joi.string().required(),
  deliveryFee: Joi.number().min(0).required(),
});

const getUserOrders = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      userId
    },
    include: {
      orderItems: {
        include: { product: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return orders;
};

const getOrderById = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId
    },
    include: {
      orderItems: {
        include: { product: true },
      },
    }
  });

  return order;
};

const createOrder = async (input: OrderInput) => {
  const { error } = orderSchema.validate(input, { abortEarly: false });

  if (error) {
    // TODO
    throw new BadRequestError(error.details[0].message);
  }

  const {
    userId,
    name,
    phone,
    payMethod,
    pickMethod,
    deliveryFee,
    } = input;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      cartItems: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.cartItems.length === 0) {
    // TODO
    throw new Error('購物車內沒有商品');
  }

  const order = await prisma.order.create({
    data: {
      userId,
      name,
      phone,
      payMethod,
      pickMethod,
      deliveryFee,
      totalAmount: cart.cartTotal + deliveryFee,
      orderItems: {
        create: cart.cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      orderItems: true,  // 確保回傳訂單時包含 OrderItem
    },
  });

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return order;
};

const deleteOrder = async (orderId: string) => {
  const order = await prisma.order.delete({
    where: {
      id: orderId
    }
  });

  return order;
};

const updateOrderStatus = async ({ orderId, userId, isPaid }: { orderId: string, userId: string, isPaid: boolean }) => {
  const order = await prisma.order.update({
    where: {
      id: orderId,
      userId,
    },
    data: {
      isPaid
    }
  });

  return order;
};

export {
  getUserOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrderStatus
};