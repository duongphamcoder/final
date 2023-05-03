import { useCallback } from 'react';

export const useStore = (key: string) => {
  const defaultValue = JSON.stringify(undefined);

  const getValueKey = useCallback(() => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || defaultValue);

      return value;
    } catch (error) {}
  }, [key]);

  const setValueKey = <T>(value: T) => {
    try {
      const convertData = JSON.stringify(value);

      localStorage.setItem(key, convertData);
    } catch (error) {}
  };

  const removeValueKey = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {}
  };

  return {
    getValueKey,
    setValueKey,
    removeValueKey,
  };
};
