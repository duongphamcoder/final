import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useStore } from 'hooks';

// Contexts
import { UserContext } from 'contexts/User/context';
import { NotificationContext } from 'contexts/Notification/context';

// Helper
import { axiosConfig, validate } from 'helpers';

// Constants
import { ENDPOINT, MESSAGES, REGEXPS, STORE_KEY, TITLE } from '@constants';

// Types
import { User } from 'types';
import { AxiosError } from 'axios';

type UseUser = {
  initialize?: Partial<User>;
  endpoint?: string;
};

export const useUser = ({
  initialize,
  endpoint = ENDPOINT.LOGIN_USER,
}: UseUser) => {
  const { isUser, action, openForm, changeForm } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const { setValueKey } = useStore(
    endpoint === ENDPOINT.LOGIN_USER ? STORE_KEY.TOKEN : STORE_KEY.ADMIN_TOKEN
  );
  const [user, setUser] = useState<Partial<User> | undefined>(initialize);
  const [errorField, setErrorField] = useState<{
    [key: string]: string;
  }>({});

  const changeData = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value.trim().toLocaleLowerCase(),
    }));
  }, []);

  const signIn = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const value = user as Required<User>;

      const { fields, isError } = validate({
        object: value,
        regexp: {
          email: {
            regexp: REGEXPS.EMAIL,
            message: MESSAGES.EMAIL_FORMAT,
          },
          password: {
            regexp: REGEXPS.PASSWORD,
            message: MESSAGES.PASSWORD_FORMAT,
          },
        },
      });

      if (isError) return setErrorField(fields);

      axiosConfig
        .post(endpoint, user)
        .then((response) => {
          const token = response.data.acceptToken;

          action(token);
          setValueKey<string>(token);

          return openForm(false);
        })
        .catch((data) => {
          const { data: error } = data.response as AxiosError;

          setNotification({
            message: error.message,
            title: TITLE.error,
            type: 'error',
          });
        });
    },
    [user]
  );

  const signInWithAdmin = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const value = user as Required<User>;

      const { isError, fields } = validate({
        object: value,
        regexp: {
          email: {
            regexp: REGEXPS.EMAIL,
            message: MESSAGES.EMAIL_FORMAT,
          },
          password: {
            regexp: REGEXPS.PASSWORD,
            message: MESSAGES.PASSWORD_FORMAT,
          },
        },
      });

      if (isError) return setErrorField(fields);

      axiosConfig
        .post(endpoint, user)
        .then((response) => {
          const token = response.data.acceptToken;

          action(token);
          setValueKey<string>(token);

          return window.location.replace(`/${ENDPOINT.ADMIN_ROOT}`);
        })
        .catch((data) => {
          const { data: error } = data.response as AxiosError;

          setNotification({
            message: error.message,
            title: TITLE.error,
            type: 'error',
          });
        });
    },
    [user]
  );

  const signUp = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const value = user as Required<User>;

      console.log(user);

      const { isError, fields } = validate({
        object: value,
        regexp: {
          phoneNumber: {
            regexp: REGEXPS.PHONE,
            message: MESSAGES.PHONE_FORMAT,
          },
          email: {
            regexp: REGEXPS.EMAIL,
            message: MESSAGES.EMAIL_FORMAT,
          },
          password: {
            regexp: REGEXPS.PASSWORD,
            message: MESSAGES.PASSWORD_FORMAT,
          },
        },
      });

      if (isError) return setErrorField(fields);

      axiosConfig
        .post(ENDPOINT.SIGNUP, user)
        .then(() => {
          setNotification({
            message: MESSAGES.SIGNUP_SUCCESS,
            title: 'Success',
          });
          changeForm();
        })
        .catch(() => {
          setNotification({
            message: `Email ${MESSAGES.ALREADY_EXIST}`,
            title: 'Email',
            type: 'error',
          });
        });
    },
    [user]
  );

  return {
    isUser,
    user,
    errorField,
    changeData,
    signIn,
    signInWithAdmin,
    signUp,
  };
};
