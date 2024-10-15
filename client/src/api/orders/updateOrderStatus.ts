import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function updateOrderStatus (payload: {
  id: string;
  isPaid: boolean
}): Promise<ApiResponse> {
  const { id, isPaid } = payload;

  const response: ApiResponse = await axiosClient.patch('/orders', { isPaid }, {
    params: {
      id,
    },
  });

  return response;
}
