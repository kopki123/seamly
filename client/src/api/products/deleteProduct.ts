import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function deleteProduct (payload: { id: string; }): Promise<ApiResponse> {
  const { id } = payload;

  const response: ApiResponse = await axiosClient.delete('/products', {
    params: {
      id,
    },
  });

  return response;
}
