import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function createCategory (payload: { name: string; }): Promise<ApiResponse> {
  const response: ApiResponse = await axiosClient.post('/categories', payload);

  return response;
}
