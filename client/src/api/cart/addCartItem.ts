import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function addCartItem (payload: {
  productId: string;
  quantity: number;
}): Promise<ApiResponse> {
  const response: ApiResponse = await axiosClient.post('/cart', payload);

  return response;
}
