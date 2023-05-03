import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import { usePagination, useStore } from 'hooks';
import { Link } from 'react-router-dom';
import useSwR from 'swr';

// HOCs
import { withErrorBoundary, withReturnUser } from 'HOCS';

// Components
import {
  AdminCard,
  OrderDetail,
  Table,
  OrderDetailType,
  StatusType,
  Loading,
  ShowMessage,
} from 'components';

// Constants
import {
  ENDPOINT,
  MESSAGES,
  SEARCH_PARAMS,
  STATISTICAL_TITLE,
  STORE_KEY,
} from '@constants';

// Types
import { Order } from 'types';

// Components
import { Button, Heading } from 'components/commons';
import { Status } from 'components';

// Styles
import styles from 'pages/Admin/Home/index.module.css';
import commons from 'styles/commons/index.module.css';

// Services
import { axiosConfig, get } from 'services';
import { AxiosError } from 'axios';

// Helpers
import {
  convertDateToString,
  convertTimeStringToDate,
  convertVND,
} from 'helpers';

type AdminHomeResponse = {
  statisticalData: {
    title: string;
    value: number;
  }[];

  orders: Order[];
};

const AdminHome = () => {
  // Get data from local storage
  const { getValueKey } = useStore(STORE_KEY.ADMIN_TOKEN);

  // Config headers
  const config = {
    headers: {
      Authorization: `Bearer ${getValueKey()}`,
      token: STORE_KEY.ADMIN_TOKEN,
    },
  };

  // Home data
  const { data, isLoading, mutate } = useSwR<AdminHomeResponse>(
    ENDPOINT.ADMIN_HOME,
    {
      fetcher: (endpoint: string) => get(endpoint, config),
    }
  );

  const [filter, setFilter] = useState<{
    orderStart: Date | '';
    orderEnd: Date | '';
    totalRevenue: Date | '';
  }>({
    orderStart: '',
    orderEnd: '',
    totalRevenue: '',
  });

  // Data order details
  const [details, setDetails] = useState<OrderDetailType[] | undefined>();

  // Order current data
  const [order, setOrder] = useState<{
    orderId: string;
    disabled: boolean;
  }>({
    orderId: '',
    disabled: false,
  });

  // --------------------- HANDLER ------------------------

  const handleChangeFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    const { name, value } = element;

    setFilter((prev) => {
      return {
        ...prev,
        [name]: value ? new Date(value) : value,
      };
    });
  }, []);

  const handleShowDetail = useCallback(async (oid: string) => {
    try {
      const response = await get<OrderDetailType[]>(
        `${ENDPOINT.ORDER_DETAIL}/${oid}`,
        config
      );

      setDetails(response);
      setOrder((prev) => ({
        ...prev,
        orderId: oid,
      }));
    } catch (error) {
      throw error as AxiosError;
    }
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetails(undefined);
    setOrder({
      disabled: false,
      orderId: '',
    });
  }, []);

  // Change status of order
  const handleChangeStatus = useCallback(
    async (status: StatusType) => {
      try {
        handleCloseDetail();

        mutate(
          async () =>
            await axiosConfig.patch(
              `${ENDPOINT.ORDER}/${order.orderId}`,
              {
                status,
              },
              config
            ),
          {
            optimisticData: (current) => {
              if (current?.orders) {
                const arr: Order[] = current?.orders || [];
                const _order = arr.find((x) => x._id === order.orderId);
                if (_order) {
                  _order.status = status;

                  return {
                    statisticalData: current?.statisticalData || [],
                    orders: current?.orders || [],
                  };
                }
              }

              return current as AdminHomeResponse;
            },

            populateCache: false,
          }
        );
      } catch (error) {
        throw error as AxiosError;
      }
    },
    [order]
  );

  // -------------------- CONVERT DATA --------------------

  // Filter orders by date
  const orderFilter = useMemo(() => {
    const _data = data?.orders || [];

    if (!filter.orderStart && !filter.orderEnd) return _data;

    if (filter.orderStart && !filter.orderEnd) {
      return _data.filter((i) => {
        const date = new Date(convertDateToString(new Date(i.createdAt)));

        return date >= filter.orderStart;
      });
    }

    if (!filter.orderStart && filter.orderEnd) {
      return _data.filter((i) => {
        const date = new Date(convertDateToString(new Date(i.createdAt)));

        return date <= filter.orderEnd;
      });
    }

    return _data.filter((i) => {
      const date = new Date(convertDateToString(new Date(i.createdAt)));

      return date >= filter.orderStart && date <= filter.orderEnd;
    });
  }, [data?.orders, filter.orderEnd, filter.orderStart]);

  // pagination order
  const { value, pagination, currentPage } = usePagination(orderFilter, 5);

  const statistical = useMemo(() => {
    const total = {
      name: STATISTICAL_TITLE.TOTAL_REVENUE,
      value: 0,
    };

    const order_processed = {
      name: STATISTICAL_TITLE.NUMBER_OF_ORDERS_PROCESSED,
      value: 0,
    };

    const being_processed = {
      name: STATISTICAL_TITLE.ORDER_IS_BEING_PROCESSED,
      value: 0,
    };

    orderFilter.forEach((i) => {
      total.value += i.status === 3 ? i.total : 0;
      order_processed.value += i.status === 3 ? 1 : 0;
      being_processed.value += i.status !== 3 ? 1 : 0;
    });

    const data = [total, order_processed, being_processed];

    const result = data.map((i, index) => (
      <AdminCard
        title={i.name}
        value={`${index === 0 ? convertVND(i.value) : i.value}`}
        key={i.name}
      />
    ));

    return result;
  }, [orderFilter]);

  // Convert rendering data table
  const orders = useMemo(() => {
    const result = value.map((i) => {
      const { _id, fullName, phoneNumber, order_date, status, total } = i;

      return {
        _id,
        Tên: fullName,
        'Số điện thoại': phoneNumber,
        'ngày đặt': convertTimeStringToDate(order_date),
        'tổng tiền': convertVND(total),
        'trạng thái': <Status status={status as StatusType} />,
        '': (
          <Button
            label="Chi tiết"
            size="small"
            variant="info"
            className={styles.btnDetail}
            onClick={() => {
              setOrder((prev) => ({
                ...prev,
                disabled: status === 3,
              }));
              handleShowDetail(_id);
            }}
          />
        ),
      };
    });

    return result;
  }, [value]);

  // Filter data order
  const orderDetails = useMemo(() => {
    const information = {
      note: '',
      address: '',
    };

    const convert = (details || []).map((i, index) => {
      if (index === 0) {
        information.note = i.orders.note;
        information.address = i.orders.address;
      }

      return {
        _id: i._id,
        productName: i.products.name,
        quantity: i.quantity,
      };
    });

    return {
      convert,
      information,
    };
  }, [details]);

  if (isLoading) return <Loading />;

  return (
    <>
      <section className={styles.statistical}>{statistical}</section>
      <div className={styles.content}>
        <div className={styles.filterOrder}>
          <label htmlFor="">
            <span className={styles.labelText}>bắt đầu</span>

            <input
              type="date"
              name="orderStart"
              value={
                filter.orderStart
                  ? convertDateToString(filter.orderStart)
                  : filter.orderStart
              }
              onChange={handleChangeFilter}
            />
          </label>

          <label htmlFor="">
            <span className={styles.labelText}>kết thúc</span>

            <input
              type="date"
              name="orderEnd"
              value={
                filter.orderEnd
                  ? convertDateToString(filter.orderEnd)
                  : filter.orderEnd
              }
              onChange={handleChangeFilter}
            />
          </label>

          <Button
            label="đặt lại"
            variant="info"
            disabled={!filter.orderEnd && !filter.orderStart}
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                orderEnd: '',
                orderStart: '',
              }))
            }
          />
        </div>

        <Heading label="Đơn hàng" size="lg" className={styles.heading} />

        {orders.length ? (
          <Table data={orders} />
        ) : (
          <ShowMessage message={MESSAGES.NO_DATA} />
        )}

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
      </div>

      {Boolean(orderDetails.convert.length) && (
        <OrderDetail
          data={orderDetails}
          disable={order.disabled}
          onClose={handleCloseDetail}
          onComplete={() => handleChangeStatus(3)}
          onDelivering={() => handleChangeStatus(2)}
          onPreparing={() => handleChangeStatus(1)}
        />
      )}
    </>
  );
};

export default memo(withErrorBoundary(withReturnUser(AdminHome)));
