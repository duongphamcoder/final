import { useCallback, useContext, useMemo } from 'react';
import { useFetch, useStore } from 'hooks';

// Components
import { Button, Heading } from 'components/commons';
import { Loading, Table } from 'components';

// Constants
import { ENDPOINT, STORE_KEY } from '@constants';

// Styles
import styles from 'pages/Admin/User/index.module.css';

// Types
import { User } from 'types';

// HOCs
import { withErrorBoundary, withReturnUser } from 'HOCS';

// Services
import { patch } from 'services';

// Contexts API
import { NotificationContext } from 'contexts/Notification/context';
import { AxiosError } from 'axios';

const UserPage = () => {
  // Show toast
  const { setNotification } = useContext(NotificationContext);

  const { getValueKey } = useStore(STORE_KEY.ADMIN_TOKEN);

  // Config headers
  const config = {
    headers: {
      Authorization: `Bearer ${getValueKey()}`,
      token: STORE_KEY.ADMIN_TOKEN,
    },
  };

  // USers list
  const { data, isLoading, setData } = useFetch<User[]>(
    `${ENDPOINT.USER}/${ENDPOINT.ADMIN_ROOT}`,
    config
  );

  // Change status 'deleted' or 'active'
  const handleChangeStatus = useCallback(
    async (_id: string) => {
      const user = (data || []).find((u) => u._id === _id);
      try {
        if (user) {
          const isDeleted = !user.deleted;
          user.deleted = isDeleted;

          setData([...(data || [])]);

          await patch(
            `${ENDPOINT.USER}/${_id}`,
            {
              deleted: isDeleted,
            },
            config
          );
        }
      } catch (error) {
        const { message } = error as AxiosError;
        console.log(error);

        return setNotification({
          message: message,
          title: 'Error',
          type: 'error',
        });
      }
    },
    [data]
  );

  // Convert data table
  const rows = useMemo(() => {
    const result = (data || []).map((row) => {
      const { _id, email, fullName, phoneNumber, deleted } = row;

      return {
        _id,
        Tên: fullName,
        'Số điện thoại': phoneNumber,
        email,
        '': (
          <Button
            label={deleted ? 'hoạt động' : 'Tạm ngừng'}
            size="small"
            variant={!deleted ? 'primary' : 'success'}
            className={styles.btnDetail}
            onClick={() => handleChangeStatus(_id)}
          />
        ),
      };
    });

    return result;
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <section className={styles.product}>
      <Heading label="Tables" size="lg" className={styles.heading} />
      <Table data={rows} className={styles.table} />
    </section>
  );
};

export default withErrorBoundary(withReturnUser(UserPage));
