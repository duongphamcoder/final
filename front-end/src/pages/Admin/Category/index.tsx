import { AxiosError } from 'axios';
import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react';
import { useFetch, useStore } from 'hooks';

// Components
import { Button, Input } from 'components/commons';
import { Loading, Table } from 'components';

// Constants
import { ENDPOINT, MESSAGES, STORE_KEY, TITLE } from '@constants';

// Styles
import styles from 'pages/Admin/Category/index.module.css';

// Types
import { Category } from 'types';
import { withErrorBoundary, withReturnUser } from 'HOCS';

// Context API
import { NotificationContext } from 'contexts/Notification/context';
import { patch, post, remove } from 'services';

const CategoriesPage = () => {
  // Show toast
  const { setNotification } = useContext(NotificationContext);

  // Get data from local storage
  const { getValueKey } = useStore(STORE_KEY.ADMIN_TOKEN);

  // config request
  const config = {
    headers: {
      Authorization: `Bearer ${getValueKey()}`,
      token: STORE_KEY.ADMIN_TOKEN,
    },
  };

  // Fetch data from server
  const { data, isLoading, setData } = useFetch<Category[]>(
    `${ENDPOINT.CATEGORIES}/${ENDPOINT.ADMIN_ROOT}`,
    config
  );

  //  State update category
  const [categoryId, setCategoryId] = useState({
    _id: '',
    value: '',
  });

  // State add new category
  const [categoryName, setCategoryName] = useState('');

  // Update category
  const handleUpdateCategory = useCallback(async () => {
    const category = data?.find((i) => i._id === categoryId._id);

    if (category && data) {
      category.name = categoryId.value;

      setData([...data]);

      setCategoryId({
        _id: '',
        value: '',
      });

      try {
        await patch(
          `${ENDPOINT.CATEGORIES}/${categoryId._id}`,
          {
            name: categoryId.value,
          },
          config
        );

        setNotification({
          message: MESSAGES.UPDATE_SUCCESS,
          title: TITLE.SUCCESS,
          type: 'success',
        });
      } catch (error) {
        const { message } = error as AxiosError;
        console.log(error);

        return setNotification({
          message: message,
          title: 'Error',
          type: 'error',
        });
      }
    }
  }, [categoryId, data]);

  // Delete category
  const handleDelete = async (_id: string) => {
    const category = data?.find((i) => i._id === _id);

    try {
      await remove(`${ENDPOINT.CATEGORIES}/${_id}`, config);

      if (category) {
        category.deleted = true;
      }

      setData((prev) => [...(prev || [])]);

      setNotification({
        message: MESSAGES.UPDATE_SUCCESS,
        title: TITLE.SUCCESS,
        type: 'success',
      });
    } catch (error) {
      const { message } = error as AxiosError;

      return setNotification({
        message: message,
        title: 'Error',
        type: 'error',
      });
    }
  };

  // Active category
  const handleActive = async (_id: string) => {
    const category = data?.find((i) => i._id === _id);

    try {
      await patch(`${ENDPOINT.CATEGORIES}/${_id}`, { deleted: false }, config);

      if (category) {
        category.deleted = false;
      }

      setData((prev) => [...(prev || [])]);

      setNotification({
        message: MESSAGES.UPDATE_SUCCESS,
        title: TITLE.SUCCESS,
        type: 'success',
      });
    } catch (error) {
      const { message } = error as AxiosError;

      return setNotification({
        message: message,
        title: 'Error',
        type: 'error',
      });
    }
  };

  // Change category name
  const handleChangeCategoryName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCategoryName(e.target.value);
    },
    []
  );

  // Add new category
  const handleAddCategory = useCallback(async () => {
    if (!categoryName) return;

    const isCategory = data?.find(
      (i) =>
        i.name.toLocaleLowerCase() === categoryName.toLocaleLowerCase().trim()
    );

    if (isCategory) {
      setNotification({
        message: `Category ${MESSAGES.ALREADY_EXIST}`,
        title: TITLE.error,
        type: 'error',
      });
    }

    try {
      const response = await post<{ name: string }, Category>(
        ENDPOINT.CATEGORIES,
        {
          name: categoryName.trim(),
        },
        config
      );

      setData((prev) => [response, ...(prev || [])]);
      setCategoryName('');
      setNotification({
        message: MESSAGES.ADD_SUCCESS,
        title: TITLE.SUCCESS,
        type: 'success',
      });
    } catch (error) {
      throw error as AxiosError;
    }
  }, [categoryName, data]);

  const rows = useMemo(() => {
    const result = (data || []).map((row) => {
      const { _id, name, deleted } = row;
      let nameRender: any = name;
      let updated = (
        <Button
          label="Update"
          size="small"
          variant="info"
          className={styles.btnDetail}
          onClick={() =>
            setCategoryId({
              _id,
              value: name,
            })
          }
        />
      );

      if (_id === categoryId._id) {
        nameRender = (
          <Input
            autoFocus
            value={categoryId.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const { value } = e.target;

              setCategoryId((prev) => ({ ...prev, value }));
            }}
          />
        );
        updated = (
          <Button
            label="Complete"
            size="small"
            variant="success"
            className={styles.btnDetail}
            onClick={handleUpdateCategory}
          />
        );
      }

      return {
        _id,
        name: nameRender,
        action: (
          <div className={styles.action}>
            {updated}
            <Button
              label={!deleted ? 'delete' : 'active'}
              size="small"
              variant={!deleted ? 'primary' : 'success'}
              className={styles.btnDetail}
              onClick={() => (!deleted ? handleDelete(_id) : handleActive(_id))}
            />
          </div>
        ),
      };
    });

    return result;
  }, [data, categoryId]);

  if (isLoading) return <Loading />;

  return (
    <section className={styles.product}>
      <div className={styles.addForm}>
        <Input
          className={styles.inputAdd}
          value={categoryName}
          placeholder="Enter category name..."
          onChange={handleChangeCategoryName}
        />

        <div className={styles.addBtn}>
          <Button
            label="Add"
            size="large"
            variant="info"
            onClick={handleAddCategory}
          />
        </div>
      </div>

      <Table data={rows} className={styles.table} />
    </section>
  );
};

export default withErrorBoundary(withReturnUser(CategoriesPage));
