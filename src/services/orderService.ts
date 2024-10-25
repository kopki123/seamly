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
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      deliveryFee: true,
      isPaid: true,
      name: true,
      payMethod: true,
      phone: true,
      pickMethod: true,
      totalAmount: true,
      userId: true,
      createdAt: true,
      orderItems: {
        select: {
          id: true,
          quantity: true,
          productId: true,
          product: {
            select: {
              id: true,
              title: true,
              description: true,
              content: true,
              image: true,
              price: true,
              sold: true,
              categoryId: true,
            }
          }
        }
      },
    }
  });

  return orders;
};

const getOrderById = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId
    },
    select: {
      id: true,
      deliveryFee: true,
      isPaid: true,
      name: true,
      payMethod: true,
      phone: true,
      pickMethod: true,
      totalAmount: true,
      userId: true,
      createdAt: true,
      orderItems: {
        select: {
          id: true,
          quantity: true,
          productId: true,
          product: {
            select: {
              id: true,
              title: true,
              description: true,
              content: true,
              image: true,
              price: true,
              sold: true,
              categoryId: true,
            }
          }
        }
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
    select: {
      id: true,
      cartTotal: true,
      numItemsInCart: true,
      cartItems: {
        select: {
          id: true,
          quantity: true,
          productId: true,
        }
      }
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
    select: {
      id: true,
      deliveryFee: true,
      isPaid: true,
      name: true,
      payMethod: true,
      phone: true,
      pickMethod: true,
      totalAmount: true,
      userId: true,
      createdAt: true,
      orderItems: {
        select: {
          id: true,
          quantity: true,
          productId: true,
          product: {
            select: {
              id: true,
              title: true,
              description: true,
              content: true,
              image: true,
              price: true,
              sold: true,
              categoryId: true,
            }
          }
        }
      },
    }
  });

  await Promise.all(order.orderItems.map(async (item) => {
    await prisma.product.update({
      where: {
        id: item.productId,
      },
      data: {
        sold: {
          increment: item.quantity,
        },
      },
    });
  }));

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return order;
};

const deleteOrder = async (orderId: string) => {
  const order = await prisma.order.delete({
    where: {
      id: orderId
    },
    select: {
      id: true,
      deliveryFee: true,
      isPaid: true,
      name: true,
      payMethod: true,
      phone: true,
      pickMethod: true,
      totalAmount: true,
      userId: true,
      orderItems: {
        select: {
          id: true,
          quantity: true,
          productId: true,
          product: {
            select: {
              id: true,
              title: true,
              description: true,
              content: true,
              image: true,
              price: true,
              sold: true,
              categoryId: true,
            }
          }
        }
      },
    }
  });

  return order;
};

const updateOrderStatus = async ({ orderId, isPaid }: { orderId: string, isPaid: boolean }) => {
  const order = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      isPaid
    },
    select: {
      id: true,
      deliveryFee: true,
      isPaid: true,
      name: true,
      payMethod: true,
      phone: true,
      pickMethod: true,
      totalAmount: true,
      userId: true,
      createdAt: true,
      orderItems: {
        select: {
          id: true,
          quantity: true,
          productId: true,
          product: {
            select: {
              id: true,
              title: true,
              description: true,
              content: true,
              image: true,
              price: true,
              sold: true,
              categoryId: true,
            }
          }
        }
      },
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