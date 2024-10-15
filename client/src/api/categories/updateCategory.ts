import axiosClient from '../axiosClient';

export default async function updateCategory (payload: {
  id: string;
  name: string;
}) {
  const { id, ...restPayload } = payload;

  const response = await axiosClient.patch('/categories', restPayload, {
    params: {
      id,
    },
  });

  return response;
}
