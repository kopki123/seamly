import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';
import type { Product } from '../products/getAllProducts';

export type CartItem = {
  id: string;
  productId: string;
  cartId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

type GetCartResponse = ApiResponse<{
  cart: {
    id: string;
    userId: string;
    numItemsInCart: number;
    cartTotal: number;
    createdAt: string;
    updatedAt: string;
    cartItems: CartItem[];
  }
}>;

export default async function getCart (): Promise<GetCartResponse> {
  const response: GetCartResponse = await axiosClient.get('/cart');

  return response;
}
