import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';
import { Order } from './getAllOrders';

type CreateOrderResponse = ApiResponse<{
  order: Order;
}>;

export default async function createOrder (payload: {
  name: string;
  phone: string;
  payMethod: string;
  pickMethod: string;
  deliveryFee: number;
}): Promise<CreateOrderResponse> {
  const response: CreateOrderResponse = await axiosClient.post('/orders', payload);

  return response;
}
