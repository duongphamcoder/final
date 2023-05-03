import { ENDPOINT, ROUTES, STORE_KEY } from '@constants';
import { AxiosError } from 'axios';
import { useStore } from 'hooks';
import { FunctionComponent, memo, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { axiosConfig } from 'services';

// Check if user is logged in or not
export const withReturnUser = <T extends object>(
  Components: FunctionComponent<T>
) => {
  const NewComponent = (props: T) => {
    const { getValueKey: getTokenAdmin, removeValueKey } = useStore(
      STORE_KEY.ADMIN_TOKEN
    );
    const isMatch = useMatch(ROUTES.LOGIN_ADMIN);

    useEffect(() => {
      const checked = async () => {
        try {
          await axiosConfig.get(ENDPOINT.VERIFY_ADMIN, {
            headers: {
              Authorization: `Bearer ${getTokenAdmin()}`,
              token: STORE_KEY.ADMIN_TOKEN,
            },
          });

          return isMatch && window.location.replace(ROUTES.ADMIN_HOME);
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
              return window.location.replace(ROUTES.LOGIN_ADMIN);
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
