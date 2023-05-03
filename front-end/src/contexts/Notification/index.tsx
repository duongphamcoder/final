import { ReactNode, useCallback, useState } from 'react';

//Contexts
import { NotificationContext } from './context';

// Types
import { Notification, NotificationProps } from 'components';

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<NotificationProps | undefined>();

  const setNotification = useCallback((notification: NotificationProps) => {
    setState(notification);

    setTimeout(() => {
      setState(undefined);
    }, 2 * 1000);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        setNotification,
      }}
    >
      {children}

      {state && <Notification {...state} />}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
