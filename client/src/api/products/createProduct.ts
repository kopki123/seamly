import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function createProduct (payload: {
  title: string;
  price: string;
  description: string;
  content: string;
  image: string;
  categoryId: string;
}): Promise<ApiResponse> {
  const response: ApiResponse = await axiosClient.post('/products', payload);

  return response;
}
