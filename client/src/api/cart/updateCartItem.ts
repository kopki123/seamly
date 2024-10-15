import type { CartItem } from './getCart';
import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

type UpdateCartItemResponse = ApiResponse<{
  cartItem: CartItem;
}>;

export default async function updateCartItem (payload: {
  id: string;
  quantity: number;
}): Promise<UpdateCartItemResponse> {
  const { id, ...restPayload } = payload;
  const response: UpdateCartItemResponse = await axiosClient.patch(`/cart/${id}`, restPayload);

  return response;
}
