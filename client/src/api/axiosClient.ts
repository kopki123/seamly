/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

enum RestRequestErrorCode {
  OFFLINE = 0,
  TIMEOUT = -1,
  BAD_REQUEST = -2,
  BAD_RESPONSE = -3,
  UNKNOWN = -999,
}

const errorMessages = {
  [RestRequestErrorCode.OFFLINE]: '沒有網路連線',
  [RestRequestErrorCode.TIMEOUT]: '連線逾時，請稍後再試',
  [RestRequestErrorCode.BAD_REQUEST]: '錯誤的請求，無法取得資源',
  [RestRequestErrorCode.BAD_RESPONSE]: '伺服器錯誤，無法執行請求',
  [RestRequestErrorCode.UNKNOWN]: '未知錯誤',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/',
  timeout: 10 * 1000, // 10s
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// @ts-expect-error
axiosClient.interceptors.response.use((response: AxiosResponse<ApiResponse>): ApiResponse => {
  // console.log(response);
  return response.data;
}, (error: AxiosError<ApiResponse>): ApiResponse => {
  console.log(error);
  const { code } = error;

  let message = '';

  // eslint-disable-next-line default-case
  switch (code) {
    case 'ERR_NETWORK':
      message = errorMessages[RestRequestErrorCode.OFFLINE];
      break;
    case 'ECONNABORTED':
      message = errorMessages[RestRequestErrorCode.TIMEOUT];
      break;
    case 'ERR_BAD_REQUEST':
      message = error.response?.data!.message || errorMessages[RestRequestErrorCode.BAD_REQUEST];
      break;
    case 'ERR_BAD_RESPONSE':
      message = errorMessages[RestRequestErrorCode.BAD_RESPONSE];
      break;
  }

  return {
    status: 'error',
    message,
  };
});

export default axiosClient;
