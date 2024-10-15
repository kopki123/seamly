import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function deleteCategory (payload: { id: string; }): Promise<ApiResponse> {
  const { id } = payload;

  const response: ApiResponse = await axiosClient.delete('/categories', {
    params: {
      id,
    },
  });

  return response;
}
