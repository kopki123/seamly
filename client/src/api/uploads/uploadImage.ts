import type { ApiResponse } from '../axiosClient';
import axiosClient from '../axiosClient';

type UploadImageResponse = ApiResponse<{
  url: string;
}>;

export default async function uploadImage (file: File): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response: UploadImageResponse = await axiosClient.post('/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
}
