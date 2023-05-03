import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react';
import { useFetch, useStore } from 'hooks';

// Constants
import { ENDPOINT, MESSAGES, REGEXPS, STORE_KEY, TITLE } from '@constants';

// Helpers
import { validate } from 'helpers';

// Styles
import styles from 'pages/Users/Profile/index.module.css';

// Components
import { Loading } from 'components';
import { Button, Heading, Input } from 'components/commons';

// Types
import { User } from 'types';

// Services
import { AxiosError } from 'axios';
import { patch } from 'services';

// Contexts
import { NotificationContext } from 'contexts/Notification/context';
import { withErrorBoundary, withUser } from 'HOCS';

const Profile = () => {
  // Show toast
  const { setNotification } = useContext(NotificationContext);

  const { getValueKey } = useStore(STORE_KEY.TOKEN);
  const { data, isLoading, setData } = useFetch<User>(ENDPOINT.USER, {
    headers: {
      Authorization: `Bearer ${getValueKey()}`,
      token: STORE_KEY.TOKEN,
    },
  });
  const [isError, setIsError] = useState<{
    [key: string]: string;
  }>({});

  const user = useMemo(() => {
    return {
      email: data?.email || '',
      fullName: data?.fullName || '',
      phoneNumber: data?.phoneNumber || '',
    };
  }, [data]);

  const changeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => {
      if (prev)
        return {
          ...prev,
          [name]: value,
        };
    });
  }, []);

  const update = useCallback(async () => {
    try {
      const rslt = validate({
        object: user,
        regexp: {
          phoneNumber: {
            regexp: REGEXPS.PHONE,
            message: MESSAGES.PHONE_FORMAT,
          },
        },
      });

      if (rslt.isError) {
        return setIsError(rslt.fields);
      }

      setIsError({});

      setNotification({
        message: MESSAGES.UPDATE_SUCCESS,
        title: TITLE.SUCCESS,
        type: 'success',
      });

      await patch(ENDPOINT.USER, user, {
        headers: {
          Authorization: `Bearer ${getValueKey()}`,
          token: STORE_KEY.TOKEN,
        },
      });
    } catch (error) {
      throw error as AxiosError;
    }
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <section className={styles.profile}>
      <Heading label="Account details" size="xl" />
      <div className={styles.information}>
        <div
          className={
            isError.fullName ? `${styles.item} ${styles.error}` : styles.item
          }
          data-error={isError.fullName || ''}
        >
          <label className={styles.field}>Full name</label>
          <Input
            className={styles.value}
            value={user.fullName}
            name="fullName"
            onChange={changeValue}
          />
        </div>
        <div
          className={
            isError.email ? `${styles.item} ${styles.error}` : styles.item
          }
          data-error={isError.email || ''}
        >
          <label className={styles.field}>Email</label>
          <Input
            disabled
            className={styles.value}
            value={user.email}
            name="email"
            onChange={changeValue}
          />
        </div>
        <div
          className={
            isError.phoneNumber ? `${styles.item} ${styles.error}` : styles.item
          }
          data-error={isError.phoneNumber || ''}
        >
          <label className={styles.field}>Phone number</label>
          <Input
            type="number"
            className={styles.value}
            value={user.phoneNumber}
            name="phoneNumber"
            onChange={changeValue}
          />
        </div>
        <div className={styles.item}>
          <Button label="save" variant="success" onClick={update} />
        </div>
      </div>
    </section>
  );
};

export default withErrorBoundary(withUser(Profile));
