import { MouseEvent } from 'react';

export type FormProps = {
  onClick?: (_event: MouseEvent) => void;
  onChangeForm?: (_event: MouseEvent) => void;
};

export { default as SignIn } from './SignIn';
export { default as SignUp } from './SignUp';
