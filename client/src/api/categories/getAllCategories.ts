import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function getAllCategories (): Promise<ApiResponse> {
  const response: ApiResponse = await axiosClient.get('/categories');

  return response;
}
