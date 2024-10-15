import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';
import type { Product } from '../products/getAllProducts';

export type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  isPaid: boolean;
  name: string;
  phone: string;
  payMethod: string;
  pickMethod: string;
  deliveryFee: number;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
};

export type OrderItem = {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

type GetAllOrdersResponse = ApiResponse<{
  orders: Order[];
}>;

export default async function getAllOrders (): Promise<GetAllOrdersResponse> {
  const response: GetAllOrdersResponse = await axiosClient.get('/orders');

  return response;
}
