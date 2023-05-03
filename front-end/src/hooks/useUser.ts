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
import { ENDPOINT, MESSAGES, REGEXPS, STORE_KEY } from '@constants';

// Types
import { User } from 'types';

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
  const [user, setUser] = useState<Partial<User> | undefined>(initialize);
  const { setValueKey } = useStore(
    endpoint === ENDPOINT.LOGIN_USER ? STORE_KEY.TOKEN : STORE_KEY.ADMIN_TOKEN
  );

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

      const { isError } = validate({
        object: value,
      });

      if (isError)
        return setNotification({
          message: 'Please enter a required',
          title: 'Error',
          type: 'error',
        });

      axiosConfig
        .post(endpoint, user)
        .then((response) => {
          const token = response.data.acceptToken;

          action(token);
          setValueKey<string>(token);

          return openForm(false);
        })
        .catch((error) => {
          const { data } = error.response;
          setNotification({
            message: data.message,
            title: 'Error',
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

      const { isError } = validate({
        object: value,
      });

      if (isError)
        return setNotification({
          message: 'Please enter a required',
          title: 'Error',
          type: 'error',
        });

      axiosConfig
        .post(endpoint, user)
        .then((response) => {
          const token = response.data.acceptToken;

          action(token);
          setValueKey<string>(token);

          return window.location.replace(`/${ENDPOINT.ADMIN_ROOT}`);
        })
        .catch((error) => {
          const { data } = error.response;
          setNotification({
            message: data.message,
            title: 'Error',
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

      const { isError } = validate({
        object: value,
        regexp: {
          phoneNumber: {
            regexp: REGEXPS.PHONE,
            message: MESSAGES.PHONE_FORMAT,
          },
        },
      });

      if (isError)
        return setNotification({
          message: 'Please enter a required',
          title: 'Error',
          type: 'error',
        });

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
    changeData,
    signIn,
    signInWithAdmin,
    signUp,
  };
};
