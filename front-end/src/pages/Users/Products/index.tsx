import { useCallback, useContext, useState } from 'react';
import { useDebounce, useStore } from 'hooks';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

// HOCs
import { withErrorBoundary } from 'HOCS';

// Components
import { Card, Cart as CartComponent, Loading, ShowMessage } from 'components';

// Types
import { Product } from 'types';

// Styles
import containerStyles from 'styles/commons/index.module.css';
import styles from './index.module.css';

// Assets
import { Banner, Cart } from 'assets/images';

// Variables
import { ENDPOINT, MESSAGES, STORE_KEY, TITLE } from '@constants';

// Services
import { AxiosError } from 'axios';
import { post } from 'services';

// Contexts
import { UserContext } from 'contexts/User/context';
import { NotificationContext } from 'contexts/Notification/context';

// Helpers
import { convertVND } from 'helpers';

const Products = () => {
  const { isUser, openForm } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const { category } = useParams();
  const { data, isLoading, error } = useSWR<Product[]>(
    `${ENDPOINT.PRODUCT_BY_CATEGORIES}/${category}`
  );
  const [isShowCart, setIsShowCart] = useState(false);
  const debounce = useDebounce();
  const { getValueKey } = useStore(STORE_KEY.TOKEN);

  if (error) {
    throw new Error(error);
  }

  const addToCart = useCallback(async (_id: string) => {
    try {
      setNotification({
        message: MESSAGES.ADD_SUCCESS,
        title: TITLE.ADD,
        type: 'success',
      });

      await post<{
        productId: string;
        quantity: number;
      }>(
        ENDPOINT.CARTS,
        {
          productId: _id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${getValueKey()}`,
            token: STORE_KEY.TOKEN,
          },
        }
      );
    } catch (err) {
      throw err as AxiosError;
    }
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.mainProduct}>
      <div className={styles.productWrapper}>
        <img src={Banner} alt="banner" className={styles.banner} />

        {data && !data.length && (
          <ShowMessage message={MESSAGES.EMPTY_PRODUCT} />
        )}

        <section className={`${containerStyles.container} ${styles.products}`}>
          {data?.map((product) => (
            <Card
              key={product._id}
              title={product.name}
              imageUrl={product.imageURL}
              price={convertVND(product.price)}
              onClick={() =>
                debounce(() => (isUser ? addToCart(product._id) : openForm()))
              }
            />
          ))}
        </section>
      </div>

      {isUser && (
        <>
          {isShowCart ? (
            <CartComponent onClose={() => setIsShowCart(false)} />
          ) : (
            <div className={styles.cart} onClick={() => setIsShowCart(true)}>
              <img src={Cart} alt="banner" className={styles.icon} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default withErrorBoundary(Products);
