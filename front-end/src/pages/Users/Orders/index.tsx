import { useMemo } from 'react';
import { usePagination, useStore } from 'hooks';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

// HOCs
import { withErrorBoundary, withUser } from 'HOCS';

// Constants
import { MESSAGES, ROUTES, SEARCH_PARAMS, STORE_KEY } from '@constants';

// Styles
import styles from 'pages/Users/Orders/index.module.css';
import commons from 'styles/commons/index.module.css';

// Types
import { Product } from 'types';

// Components
import { Loading, ShowMessage } from 'components';

// Helpers
import { convertVND } from 'helpers';

// Servcies
import { get } from 'services';

const Orders = () => {
  const { getValueKey } = useStore(STORE_KEY.TOKEN);
  const { data = [], isLoading } = useSWR<
    {
      result: { quantity: number };
      product: Product;
    }[]
  >(ROUTES.ORDER, {
    fetcher: (endpoint: string) =>
      get(endpoint, {
        headers: {
          Authorization: `Bearer ${getValueKey()}`,
          token: STORE_KEY.TOKEN,
        },
      }),
  });
  const { value, pagination, currentPage } = usePagination(data);

  // Convert data rendering to page
  const orders = useMemo(() => {
    return value.map(({ product, result: { quantity } }) => ({
      ...(product || {}),
      quantity,
    }));
  }, [value]);

  if (isLoading) return <Loading />;

  if (!orders.length)
    return (
      <ShowMessage message={MESSAGES.EMPTY_ORDER} className={styles.message} />
    );

  return (
    <section className={styles.wrapper}>
      <div className={styles.orders}>
        {orders.map((order, index) => (
          <div className={styles.order} key={`${order._id}${index}`}>
            <img src={order.imageURL} alt="" className={styles.image} />
            <div className={styles.information}>
              <p className={styles.name} title={order.name}>
                {order.name}
              </p>
              <p className={styles.quantity}>x{order.quantity}</p>
            </div>
            <p className={styles.price}>{convertVND(order.price)}</p>
          </div>
        ))}
      </div>

      <div className={commons.pagination}>
        {pagination.map((i, index) => {
          const page = index + 1;
          const className = `${commons.paginationItem} ${
            currentPage === page ? commons.active : ''
          }`;

          return (
            <Link
              to={`?${SEARCH_PARAMS.PAGE}=${page}`}
              key={page}
              className={className}
            >
              {page}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default withErrorBoundary(withUser(Orders));
