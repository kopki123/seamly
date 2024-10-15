import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

type CheckLoginStatusResponse = ApiResponse<{
  user: {
    userId: string;
    email: string;
    role: number;
  }
}>;

export default async function checkLoginStatus (): Promise<CheckLoginStatusResponse> {
  const response: CheckLoginStatusResponse = await axiosClient.get('/auth/check-token');

  return response;
}
