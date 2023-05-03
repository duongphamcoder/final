/* eslint-disable @typescript-eslint/no-empty-function */
import { NotificationProps } from 'components';
import { createContext } from 'react';

export const NotificationContext = createContext<{
  setNotification: (_notification: NotificationProps) => void;
}>({
  setNotification: () => {},
});
