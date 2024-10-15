import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function register (payload: {
  email: string;
  password: string;
}): Promise<ApiResponse> {
  const response: ApiResponse = await axiosClient.post('/auth/register', payload);

  return response;
}
