// import { STORE_KEY } from '@constants';
import axios, { AxiosRequestConfig } from 'axios';

export const axiosConfig = axios.create({
  baseURL: process.env.VITE_URL,
});

export const axiosCheckLogin = axios.create({
  baseURL: process.env.VITE_URL,
});

axiosConfig.interceptors.response.use(
  (response) => {
    const { data } = response;

    return data;
  },
  async (err) => {
    const originalRequest = err.config;
    const {
      status,
      data: { data },
    } = err.response;

    if (status === 403 && data.isRefreshToken) {
      const token = err.config.headers.Authorization.split(' ')[1];
      const keyToken = err.config.headers.token;

      const { newToken } = await axiosConfig
        .get('auth/refresh', {
          headers: {
            Authorization: `Bearer ${token || ''}`,
          },
        })
        .then((r) => r.data);

      localStorage.setItem(keyToken, JSON.stringify(newToken));

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return axiosConfig(originalRequest);
    }

    return Promise.reject(err);
  }
);

const get = <T = any>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> => axiosConfig.get(endpoint, config).then((r) => r.data);

const post = async <T, R = any>(
  endpoint: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<R> =>
  await axiosConfig.post(endpoint, data, config).then((r) => r.data);

const put = <T, R = any>(
  endpoint: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<R> => axiosConfig.put(endpoint, data, config).then((r) => r.data);

const patch = <T = object, R = any>(
  endpoint: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<R> => axiosConfig.patch(endpoint, data, config).then((r) => r.data);

const remove = <R = any>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<R> => axiosConfig.delete(endpoint, config).then((r) => r.data);

export { get, post, put, remove, patch };
