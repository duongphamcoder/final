import { useFetch, useStore } from 'hooks';

// Components
import { Button, Heading } from 'components/commons';
import { Payment, Loading } from 'components';

// Styles
import styles from './index.module.css';

// Assets
import { Xletter } from 'assets/icons';
import { MouseEvent, useCallback, useMemo, useState } from 'react';

// Contexts
// import { NotificationContext } from 'contexts/Notification/context';

// Constants
import { ENDPOINT, STORE_KEY } from '@constants';

// Types
import { Cart, Convert, Order } from 'types';

// HOCs
import { withErrorBoundary } from 'HOCS';
import { useDebounce } from 'hooks/useDebounce';

// Services
import { patch, remove, post } from 'services';
import { AxiosError } from 'axios';

// Helpers
import { convertVND } from 'helpers';
import { Address } from 'mock-data';

type CartProps = {
  onClose?: (_e: MouseEvent) => void;
};

const CartComponent = ({ onClose }: CartProps) => {
  const { getValueKey } = useStore(STORE_KEY.TOKEN);
  const { data, isLoading, setData } = useFetch<Cart[]>(ENDPOINT.CARTS, {
    headers: {
      Authorization: `Bearer ${getValueKey()}`,
      token: STORE_KEY.TOKEN,
    },
  });
  const [isPayment, setIsPayment] = useState(false);

  const debounce = useDebounce();

  const value = useMemo((): {
    carts: Cart[];
    total: number;
  } => {
    const carts = data || [];
    const total = carts.reduce((result, cart) => {
      return result + cart.productId.price * cart.quantity;
    }, 0);

    return {
      carts,
      total,
    };
  }, [data]);

  const changeQuantity = useCallback(
    (_id: string, step: 1 | -1) => {
      const currentCart = value.carts.find((c) => c._id === _id);

      if (!currentCart || !data) {
        return;
      }

      currentCart.quantity = currentCart.quantity + step;

      if (currentCart.quantity < 1) {
        return;
      }

      debounce(async () => {
        await patch(`carts/${_id}`, {
          quantity: currentCart.quantity,
        });
      });
      setData([...data]);
    },
    [data]
  );

  const deleteProductFormCart = useCallback((_id: string) => {
    setData((prev) => prev?.filter((c) => c._id !== _id));
    remove(`carts/${_id}`, {
      headers: {
        Authorization: `Bearer ${getValueKey()}`,
        token: STORE_KEY.TOKEN,
      },
    });
  }, []);

  const payment = useCallback(
    async (address: Address, note: string, phoneNumber = '') => {
      try {
        setData((prev) => prev?.filter((c) => !c.active));

        const payload: {
          [key: string]: number | string;
        } = {
          address: address.name,
          note,
          total: value.total + address.fee,
        };

        if (phoneNumber) payload.phoneNumber = phoneNumber;

        await post<Partial<Convert<Order>>>(ENDPOINT.ORDER, payload, {
          headers: {
            Authorization: `Bearer ${getValueKey()}`,
            token: STORE_KEY.TOKEN,
          },
        });
      } catch (error) {
        throw error as AxiosError;
      }
    },
    [value]
  );

  return (
    <section className={styles.cart}>
      <Button
        label="^"
        variant="primary"
        onClick={onClose}
        className={styles.close}
        size="large"
      />
      <div className={styles.products}>
        {isLoading ? (
          <Loading isShowText={false} />
        ) : (
          <>
            {value.carts.map((cart) => {
              const { name, price } = cart.productId;

              return (
                <div className={styles.productItem} key={cart._id}>
                  <div className={styles.title}>
                    <Heading label={name} size="md" />
                    <Button
                      label=""
                      leftIcon={Xletter}
                      variant="primary"
                      onClick={() => deleteProductFormCart(cart._id)}
                    />
                  </div>
                  <div className={styles.action}>
                    <div className={styles.change}>
                      <span
                        className={styles.changeBtn}
                        onClick={() => {
                          changeQuantity(cart._id, -1);
                        }}
                      >
                        -
                      </span>
                      <span className={styles.quantity}>{cart.quantity}</span>
                      <span
                        className={styles.changeBtn}
                        onClick={() => {
                          changeQuantity(cart._id, 1);
                        }}
                      >
                        +
                      </span>
                    </div>
                    <p className={styles.price}>{convertVND(price)}</p>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className={styles.payment}>
        <p className={styles.total}>
          Total: <span>{convertVND(value.total)}</span>
        </p>
        <div className={styles.submit}>
          <Button
            label="Payment"
            variant="primary"
            disabled={!value.total}
            onClick={() => {
              setIsPayment(true);
            }}
          />
        </div>
      </div>

      {isPayment && (
        <Payment
          currentTotal={value.total}
          handlePayment={payment}
          onClose={() => setIsPayment(false)}
        />
      )}
    </section>
  );
};

export default withErrorBoundary(CartComponent);
