import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

type GetUserInfoResponse = ApiResponse<{
  user: {
    id: string;
    email: string;
    role: number;
  }
}>;

export default async function getUserInfo (): Promise<GetUserInfoResponse> {
  const response: GetUserInfoResponse = await axiosClient.get('/user/info');

  return response;
}
