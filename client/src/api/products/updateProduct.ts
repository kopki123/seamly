import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function updateProduct (payload: {
  id: string;
  title?: string;
  price?: string;
  description?: string;
  content?: string;
  image?: string;
  categoryId?: string;
}): Promise<ApiResponse> {
  const { id, ...restPayload } = payload;

  const response: ApiResponse = await axiosClient.patch('/products', restPayload, {
    params: {
      id,
    },
  });

  return response;
}
