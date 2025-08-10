import { Cart } from '@prisma/client';
import prisma from '../prisma-client.js';

const isCartItemOwnedByUser = async (userId: string, cartItemId: string) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: {
      id: cartItemId
    },
    include: {
      cart: true,
    },
  });

  return cartItem && cartItem.cart.userId === userId;
};

const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await prisma.cart.findFirst({
    where: {
      userId
    },
    select: {
      id: true,
      cartTotal: true,
      numItemsInCart: true,
      cartItems: {
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
      }
    }
  });

  if(!cart && errorOnFailure) {
    throw new Error('找不到購物車');
  }

  if(!cart) {
    cart = await prisma.cart.create({
      data: {
        userId
      },
      select: {
        id: true,
        cartTotal: true,
        numItemsInCart: true,
        cartItems: {
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
        }
      }
    });
  }

  return cart;
};

const updateOrCreateCartItem = async ({ productId, cartId, quantity }: { productId: string; cartId: string; quantity: number }) => {
  let cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
    select: {
      id: true,
      quantity: true,
    }
  });

  if(cartItem) {
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id
      },
      data: {
        quantity: cartItem.quantity + quantity
      }
    });
  } else {
    cartItem = await prisma.cartItem.create({
      data: {
        productId,
        quantity,
        cartId
      }
    });
  }

  return cartItem;
};

const getCart = async (userId: string) => {
  const cart = await fetchOrCreateCart({ userId });
  const { currentCart } = await updateCart(cart);

  return currentCart;
};

const updateCart = async (cart: Partial<Cart>) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    select: {
      id: true,
      quantity: true,
      product: {
        select: {
          price: true,
        }
      }
    }
  });

  const { numItemsInCart, cartTotal } = cartItems.reduce(({ numItemsInCart, cartTotal }, item) => ({
    numItemsInCart: numItemsInCart + item.quantity,
    cartTotal: cartTotal + item.quantity * item.product.price,
  }), {
    numItemsInCart: 0,
    cartTotal: 0
  });

  const currentCart = await prisma.cart.update({
    where: {
      id: cart.id
    },
    data: {
      numItemsInCart,
      cartTotal,
    },
    select: {
      id: true,
      cartTotal: true,
      numItemsInCart: true,
      cartItems: {
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
      }
    }
  });

  return { cartItems, currentCart };
};

const addToCart = async ({ userId, productId, quantity }: { userId: string; productId: string; quantity: number }) => {
  const cart = await fetchOrCreateCart({ userId });

  await updateOrCreateCartItem({ productId, cartId: cart.id, quantity });
  await updateCart(cart);
};

const removeCartItem = async ({ cartItemId, userId }: { cartItemId: string; userId: string }) => {
  const cart = await fetchOrCreateCart({ userId, errorOnFailure: true });

  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
      cartId: cart.id,
    }
  });

  await updateCart(cart);
};

const updateCartItem = async({ quantity, cartItemId, userId }: { quantity: number; cartItemId: string; userId: string }) => {
  const cart = await fetchOrCreateCart({ userId, errorOnFailure: true });

  const updatedItem = await prisma.cartItem.update({
    where: {
      id: cartItemId,
      cartId: cart.id,
    },
    data: {
      quantity
    },
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
  });

  await updateCart(cart);

  return updatedItem;
};

export {
  isCartItemOwnedByUser,
  fetchOrCreateCart,
  updateOrCreateCartItem,
  getCart,
  updateCart,
  addToCart,
  removeCartItem,
  updateCartItem,
};