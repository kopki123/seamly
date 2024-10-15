import axiosClient from '../axiosClient';

export default async function deleteOrder (payload: { id: string; }) {
  const { id } = payload;

  const response = await axiosClient.delete('/orders', {
    params: {
      id,
    },
  });

  return response;
}
