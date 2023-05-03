import { ReactNode, useCallback, useMemo, useState } from 'react';

// Context
import { LoadingContext } from 'contexts/Loading/context';

// Components
import { Loading } from 'components';

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const props = useMemo(
    () => ({
      dispatchLoading: dispatch,
    }),
    []
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <LoadingContext.Provider value={props}>{children}</LoadingContext.Provider>
  );
};

export default LoadingProvider;
