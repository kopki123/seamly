import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  content: string;
  image: string;
  categoryId: string;
  sold: number;
  createdAt: string;
  updatedAt: string;
};

type GetAllProductsResponse = ApiResponse<{
  products: Product[];
}>;

export default async function getAllProducts (payload: {
  categoryId?: string;
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
} = {}): Promise<GetAllProductsResponse> {
  const response: GetAllProductsResponse = await axiosClient.get('/products', {
    params: payload
  });

  return response;
}
