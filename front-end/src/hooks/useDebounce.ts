import { useCallback, useRef } from 'react';

export const useDebounce = () => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const debounce = useCallback((callback: () => void) => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(callback, 600);
  }, []);

  return debounce;
};
