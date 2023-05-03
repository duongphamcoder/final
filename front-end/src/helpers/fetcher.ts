import { STORE_KEY } from '@constants';
import axios, { AxiosRequestConfig } from 'axios';

export const axiosConfig = axios.create({
  baseURL: process.env.VITE_URL,
});

axiosConfig.interceptors.response.use(
  (response) => {
    const { data } = response;

    return data;
  },
  async (err) => {
    const { status } = err.response;

    if (status === 403) {
      const { newToken } = await axiosConfig
        .get('auth/refresh', {
          headers: {
            Authorization: `Bear ${JSON.parse(
              localStorage.getItem(STORE_KEY.TOKEN) || ''
            )}`,
          },
        })
        .then((r) => r.data);

      localStorage.setItem('token', JSON.stringify(newToken));
    }

    return Promise.reject(err);
  }
);

export const fetcher = <T = any>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> => axiosConfig.get(endpoint, config).then((r) => r.data);

export const sendRequest = (
  endpoint: string,
  type: 'post' | 'put' | 'delete' | 'patch',
  data?: {
    [key: string]: any;
  }
) => {
  return axiosConfig[type](endpoint, data)
    .then((r) => r.data.data)
    .catch((err) => err.message);
};
