import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

type LoginResponse = ApiResponse<{
  user: {
    userId: string;
    role: number;
  }
}>;

export default async function login (payload: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const response: LoginResponse = await axiosClient.post('/auth/login', payload);

  return response;
}
