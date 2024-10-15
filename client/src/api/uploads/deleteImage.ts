import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function deleteImage (payload: { id: string; }): Promise<ApiResponse> {
  const { id } = payload;

  const response: ApiResponse = await axiosClient.delete('/uploads', {
    params: {
      id,
    },
  });

  return response;
}
