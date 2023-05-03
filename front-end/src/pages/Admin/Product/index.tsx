import { AxiosError } from 'axios';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useFetch, useStore } from 'hooks';
import useSWR from 'swr';

// HOCs
import { withErrorBoundary, withReturnUser } from 'HOCS';

// Components
import { Button, Input } from 'components/commons';
import { Loading, Status, Table } from 'components';
import AddProduct, { AddProductType } from 'components/AddProduct';

// Constants
import { ENDPOINT, MESSAGES, STORE_KEY } from '@constants';

// Styles
import styles from 'pages/Admin/Product/index.module.css';

// Types
import { Category, Product } from 'types';

// Context API
import { NotificationContext } from 'contexts/Notification/context';

// Helpers
import { convertVND, validate } from 'helpers';

// Services
import { post, get, patch, remove, uploadImage } from 'services';

type Change = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

const ProductPage = () => {
  // Show toast
  const { setNotification } = useContext(NotificationContext);

  // Get data form localStorages
  const { getValueKey } = useStore(STORE_KEY.ADMIN_TOKEN);

  // Config headers
  const configs = {
    headers: {
      Authorization: `Bearer ${getValueKey()}`,
      token: STORE_KEY.ADMIN_TOKEN,
    },
  };

  // Product list
  const {
    data = [],
    isLoading,
    setData,
  } = useFetch<Partial<Product>[]>(ENDPOINT.PRODUCT, configs);

  // Categories
  const { data: categories = [] } = useSWR<Category[]>(ENDPOINT.CATEGORIES);

  const [search, setSearch] = useState<{
    name: string;
    categoryId: string;
  }>({
    name: '',
    categoryId: '',
  });

  // Check which form is displayed
  const [isShowForm, setIsShowForm] = useState({
    isAdd: false,
    isDetail: false,
  });

  // Data form add product
  const [product, setProduct] = useState<AddProductType>({
    category_id: '',
    imageURL: '',
    name: '',
    price: '',
  });

  // Data detail form
  const [detail, setDetail] = useState<Product | undefined>();

  // Check if upload images
  const [isUpload, setIsUpload] = useState(false);

  // ------------------- HANDLER ----------------

  // Handle show product details
  const handleShowDetail = useCallback(async (_id: string) => {
    try {
      const product = await get(`${ENDPOINT.PRODUCT}/${_id}`);

      setDetail(product);
    } catch (error) {
      const { message } = error as AxiosError;

      return setNotification({
        message: message,
        title: 'Error',
        type: 'error',
      });
    }
  }, []);

  // Handle add product
  const addProduct = async (e: FormEvent) => {
    e.preventDefault();

    const { isError } = validate({
      object: product,
    });

    if (isError)
      return setNotification({
        message: 'Please enter a required',
        title: 'Error',
        type: 'error',
      });

    const payload = {
      ...product,
      price: +product.price,
    };

    try {
      setIsShowForm((prev) => ({
        ...prev,
        isAdd: false,
      }));

      setData((prev) => {
        const data = {
          ...product,
          price: +product.price,
          _id: '',
        };

        return [...(prev || []), { ...data }];
      });

      await post(ENDPOINT.PRODUCT, payload, configs);
    } catch (error) {
      const { message } = error as AxiosError;

      return setNotification({
        message: message,
        title: 'Error',
        type: 'error',
      });
    }
  };

  // Handle update product
  const updateProduct = useCallback(async () => {
    const id = detail?._id;

    try {
      if (data) {
        const index = data?.findIndex((i) => i._id === id);

        data?.splice(index, 1, {
          ...detail,
          price: +(detail?.price || '0'),
        } as Product);

        setData([...data]);
        setDetail(undefined);
        setNotification({
          title: 'Update',
          message: 'Update successful',
          type: 'success',
        });
        await patch(`${ENDPOINT.PRODUCT}/${id}`, detail, configs);
      }
    } catch (error) {
      const { message } = error as AxiosError;

      return setNotification({
        message: message,
        title: 'Error',
        type: 'error',
      });
    }
  }, [detail]);

  // Handle delete product
  const deleteProduct = useCallback(async () => {
    const id = detail?._id;

    try {
      if (data) {
        const index = data?.findIndex((i) => i._id === id);

        data?.splice(index, 1, {
          ...detail,
          isActive: false,
        } as Product);

        setData([...data]);
        setDetail(undefined);
        setNotification({
          title: 'Deleted',
          message: 'Delete successful',
          type: 'success',
        });
        await remove(`${ENDPOINT.PRODUCT}/${id}`, configs);
      }
    } catch (error) {
      const { message } = error as AxiosError;

      return setNotification({
        message: message,
        title: 'Error',
        type: 'error',
      });
    }
  }, [detail]);

  // Update active product
  const activeProduct = useCallback(async () => {
    const id = detail?._id;

    try {
      if (data) {
        const index = data?.findIndex((i) => i._id === id);

        data?.splice(index, 1, {
          ...detail,
          isActive: true,
        } as Product);

        setData([...data]);
        setDetail(undefined);
        setNotification({
          title: 'Deleted',
          message: 'Delete successful',
          type: 'success',
        });
        await patch(
          `${ENDPOINT.PRODUCT}/${id}`,
          {
            isActive: true,
          },
          configs
        );
      }
    } catch (error) {
      const { message } = error as AxiosError;

      return setNotification({
        message: message,
        title: 'Error',
        type: 'error',
      });
    }
  }, [detail]);

  // Change product value
  const changeData = <T,>(e: Change, callback: Dispatch<SetStateAction<T>>) => {
    const element = e.target;
    const { name, value } = element;

    if (name === 'imageURL') {
      const files = (element as HTMLInputElement)?.files;

      if (files) {
        setIsUpload(true);

        const formData = new FormData();

        formData.append('image', files[0]);

        uploadImage(formData, (response) => {
          setIsUpload(false);

          if (response.status === false) {
            setNotification({
              message: MESSAGES.UPLOAD_IMAGE_FAILED,
              title: 'Error',
              type: 'error',
            });

            return;
          }

          callback((prev) => ({
            ...prev,
            imageURL: response.url,
          }));
        });

        return;
      }
    }

    callback((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  // ---------------- CONVERTS ----------------

  // Filter products by name
  const filter = useMemo(() => {
    const result = (data || []).filter((product) => {
      return (
        (product?.categoryId || '')
          .toLowerCase()
          .includes(search.categoryId.toLowerCase()) &&
        (product?.name || '').toLowerCase().includes(search.name.toLowerCase())
      );
    });

    return result;
  }, [data, search]);

  // Convert data table
  const rows = useMemo(() => {
    const result = filter.map((row) => {
      const { _id, name, price, imageURL, isActive } = row;

      return {
        _id,
        image: <img src={imageURL} className={styles.productPhoto} />,
        name,
        price: convertVND(price || 0),
        active: <Status status={isActive ? 4 : 5} />,
        action: (
          <Button
            label="more"
            size="small"
            variant="info"
            className={styles.btnDetail}
            onClick={() => handleShowDetail(_id || '')}
          />
        ),
      };
    });

    return result;
  }, [filter]);

  // Convert data update form
  const dataFormUpdate = useMemo((): AddProductType => {
    if (detail) {
      const { name, price, imageURL, categoryId } = detail;

      return { name, price: `${price}`, imageURL, category_id: categoryId };
    }

    return product;
  }, [detail]);

  if (isLoading) return <Loading />;

  return (
    <section className={styles.product}>
      <div className={styles.action}>
        <div className={styles.filter}>
          <Input
            className={styles.inputFilter}
            value={search.name}
            placeholder="Enter name..."
            onChange={(e) => {
              setSearch((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />

          <select
            name="categoryId"
            id=""
            className={styles.categories}
            onChange={(e) => {
              setSearch((prev) => ({
                ...prev,
                categoryId: e.target.value,
              }));
            }}
          >
            <option value="">---- Select Category ----</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.addBtn}>
          <Button
            label="Add"
            size="large"
            variant="info"
            onClick={() =>
              setIsShowForm((prev) => ({
                ...prev,
                isAdd: true,
              }))
            }
          />
        </div>
      </div>
      <Table data={rows || {}} className={styles.table} />

      {isShowForm.isAdd && (
        <AddProduct
          product={product}
          isUpload={isUpload}
          handleChange={(e: Change) =>
            changeData<AddProductType>(e, setProduct)
          }
          onSubmit={addProduct}
          onClose={() =>
            setIsShowForm((prev) => ({
              ...prev,
              isAdd: false,
            }))
          }
        />
      )}

      {detail && (
        <AddProduct
          product={dataFormUpdate}
          isUpload={isUpload}
          isUpdateForm
          isDeleted={detail.isActive}
          handleChange={(e: Change) =>
            changeData<Product | undefined>(e, setDetail)
          }
          onUpdate={updateProduct}
          onDelete={deleteProduct}
          onActive={activeProduct}
          onClose={() => setDetail(undefined)}
        />
      )}
    </section>
  );
};

export default withErrorBoundary(withReturnUser(ProductPage));
