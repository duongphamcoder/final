/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, SetStateAction, createContext } from 'react';

type Props = {
  isUser: string;
  action: Dispatch<SetStateAction<string>>;
  openForm: (_isShow?: boolean) => void;
  changeForm: (_isShow?: boolean) => void;
};

const dispatch: Dispatch<SetStateAction<string>> = () => {};

export const UserContext = createContext<Props>({
  isUser: '',
  action: dispatch,
  openForm: () => {},
  changeForm: () => {},
});
