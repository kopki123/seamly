import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

type CheckoutResponse = ApiResponse<{
  html: string;
}>;

export default async function checkout (payload: {
  id: string;
}): Promise<CheckoutResponse> {
  const { id } = payload;
  const response: CheckoutResponse = await axiosClient.get(`/checkout/${id}`);

  return response;
}
