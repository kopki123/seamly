import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function removeCartItem (payload: { id: string; }): Promise<ApiResponse> {
  const { id } = payload;
  const response: ApiResponse = await axiosClient.delete(`/cart/${id}`);

  return response;
}
