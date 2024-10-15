import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function logout (): Promise<ApiResponse> {
  const response: ApiResponse = await axiosClient.get('/auth/logout');

  return response;
}
