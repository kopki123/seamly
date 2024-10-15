// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ApiResponseParams<T = any>{
  status?: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: Record<string, string> | null;
}

export default function apiResponse ({ message = '成功', status = 'success', data = null }: ApiResponseParams = {}) {
  return {
    status,
    message,
    data,
  };
}