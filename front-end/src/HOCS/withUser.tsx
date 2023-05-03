import { ENDPOINT, ROUTES, STORE_KEY } from '@constants';
import { AxiosError } from 'axios';
import { useStore } from 'hooks';
import { FunctionComponent, memo, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { axiosConfig } from 'services';

// Check if user is logged in or not
export const withUser = <T extends object>(
  Components: FunctionComponent<T>
) => {
  const NewComponent = (props: T) => {
    const { getValueKey, removeValueKey } = useStore(STORE_KEY.TOKEN);
    const isMatch = useMatch(ROUTES.LOGIN_ADMIN);

    useEffect(() => {
      const checked = async () => {
        try {
          await axiosConfig.get(ENDPOINT.VERIFY_USER, {
            headers: {
              Authorization: `Bearer ${getValueKey()}`,
              token: STORE_KEY.TOKEN,
            },
          });
        } catch (err) {
          const { response } = err as AxiosError<{
            data: {
              [key: string]: string;
            };
          }>;

          if (
            response &&
            response.status === 403 &&
            response.data.data.isLoginRequired
          ) {
            removeValueKey();
            if (!isMatch) {
              return window.location.replace(ROUTES.ROOT);
            }
          }
        }
      };

      checked();
    }, []);

    return <Components {...props} />;
  };
  return memo(NewComponent);
};
