import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { usePagination, useStore } from 'hooks';

// Components
import { Loading, ShowMessage, Status, StatusType } from 'components';

// Constants
import { ENDPOINT, MESSAGES, SEARCH_PARAMS, STORE_KEY } from '@constants';

// Helpers
import { convertTimeStringToDate, convertVND } from 'helpers';

// Styles
import styles from 'pages/Users/Delivering/index.module.css';

// Types
import { Delivering } from 'types';

// Services
import { get } from 'services';
import { withErrorBoundary, withUser } from 'HOCS';

const Deliver = () => {
  const { getValueKey } = useStore(STORE_KEY.TOKEN);
  const { data = [], isLoading } = useSWR<Delivering[]>(
    `${ENDPOINT.ORDER}/${ENDPOINT.DELIVERING}`,
    {
      fetcher: (endpoint: string) =>
        get(endpoint, {
          headers: {
            Authorization: `Bearer ${getValueKey()}`,
            token: STORE_KEY.TOKEN,
          },
        }),
    }
  );

  const { value, pagination, currentPage } = usePagination(data, 1);

  // Convert data
  const result = useMemo(() => {
    return value.map((value) => {
      const { orderDetails, products, ...rest } = value;

      const result = products.map((product, index) => {
        return {
          ...product,
          quantity: orderDetails[index].quantity,
        };
      });

      return {
        ...rest,
        products: result,
      };
    });
  }, [value]);

  if (isLoading) return <Loading />;

  if (!data?.length)
    return (
      <ShowMessage
        message={MESSAGES.EMPTY_DELIVERY}
        className={styles.message}
      />
    );

  return (
    <section className={styles.wrapper}>
      {result.map((i) => {
        return (
          <div className={styles.purchase} key={i._id}>
            <div className={styles.title}>
              <p className={styles.time}>
                {convertTimeStringToDate(i.createdAt)}
              </p>
              <div className={styles.status}>
                <span>Status:</span>
                <Status status={i.status as StatusType} />
              </div>
            </div>

            <div className={styles.details}>
              {i.products.map((j) => (
                <div className={styles.order} key={j._id}>
                  <img src={j.imageURL} alt="" className={styles.image} />
                  <div className={styles.information}>
                    <p className={styles.name} title={j.name}>
                      {j.name}
                    </p>
                    <p className={styles.quantity}>x{j.quantity}</p>
                  </div>
                  <p className={styles.price}>{convertVND(j.price)}</p>
                </div>
              ))}
            </div>

            <p className={styles.total}>
              <span className={styles.totalText}>Total:</span>
              <span className={styles.totalValue}>{convertVND(i.total)}</span>
            </p>
          </div>
        );
      })}

      <div className={styles.pagination}>
        {pagination.map((_i, index) => {
          const page = index + 1;
          const className = `${styles.paginationItem} ${
            currentPage === page ? styles.active : ''
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

export default withErrorBoundary(withUser(Deliver));
