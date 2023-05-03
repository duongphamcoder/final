import { useEffect, useState } from 'react';

// Services
import { get } from 'services';
import { AxiosError, AxiosRequestConfig } from 'axios';

export const useFetch = <T>(url: string, config?: AxiosRequestConfig) => {
  const [state, setState] = useState<T | undefined>();
  const [isError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async (config?: AxiosRequestConfig) => {
      setIsLoading(true);
      try {
        const data = await get<T>(url, config)
          .then((r) => r)
          .catch((er) => Promise.reject(er));

        setState(data);

        setTimeout(() => setIsLoading(false), 2000);
      } catch (err) {
        throw err as AxiosError;
      }
    };

    getData(config);
  }, [url]);

  return {
    data: state,
    error: isError,
    isLoading,
    setData: setState,
  };
};
