import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';
import type { Order } from './getAllOrders';

type GetSingleOrderResponse = ApiResponse<{
  order: Order;
}>;

export default async function getSingleOrder (payload: {
  id: string;
}): Promise<GetSingleOrderResponse> {
  const { id } = payload;
  const response: GetSingleOrderResponse = await axiosClient.get(`/orders/${id}`);

  return response;
}
