import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

export default async function verifyEmail (payload: {
  verificationToken: string;
  email: string;
}): Promise<ApiResponse> {
  const response: ApiResponse = await axiosClient.post('/auth/verify-email', payload);

  return response;
}
