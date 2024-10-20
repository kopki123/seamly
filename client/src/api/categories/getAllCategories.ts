import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export type Category = {
  id: string;
  name: string;
};

type GetAllCategoriesResponse = ApiResponse<{
  categories: Category[];
}>;

export default async function getAllCategories (): Promise<GetAllCategoriesResponse> {
  const response: GetAllCategoriesResponse = await axiosClient.get('/categories');

  return response;
}
