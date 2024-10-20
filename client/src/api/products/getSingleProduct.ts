import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';
import type { Product } from './getAllProducts';

type GetSingleProductResponse = ApiResponse<{
  product: Product;
}>;

export default async function getSingleProduct (payload: {
  id: string;
}): Promise<GetSingleProductResponse> {
  const { id } = payload;
  const response: GetSingleProductResponse = await axiosClient.get(`/products/${id}`);

  return response;
}
