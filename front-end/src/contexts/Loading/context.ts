import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultDispatch = () => {};

export const LoadingContext = createContext<{
  dispatchLoading: (_isLoading: boolean) => void;
}>({
  dispatchLoading: defaultDispatch,
});
