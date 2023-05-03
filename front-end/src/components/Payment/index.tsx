// Mock data
import { Address, address } from 'mock-data';

// Styles
import styles from 'components/Payment/index.module.css';
import commons from 'styles/commons/index.module.css';
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useContext,
  useState,
} from 'react';

// Components
import { Button, Heading } from 'components/commons';

// Helpers
import { convertVND, validate } from 'helpers';

// Contexts
import { NotificationContext } from 'contexts/Notification/context';

type PaymentProps = {
  currentTotal: number;
  handlePayment: (_address: Address, _note: string) => void;
  onClose: (_e?: MouseEvent) => void;
};

const Payment = (props: PaymentProps) => {
  const { currentTotal, handlePayment, onClose } = props;

  const { setNotification } = useContext(NotificationContext);
  const [state, setState] = useState<{
    address: Address;
    addressDetail: string;
    note: string;
  }>({
    address: {
      name: '',
      fee: 0,
    },
    note: '',
    addressDetail: '',
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
      const element = e.target;
      const { name, value } = element;

      if (name === 'address') {
        return setState((prev) => {
          const [fee, name] = value.split('-');

          return {
            ...prev,
            address: {
              fee: +fee,
              name: name || '',
            },
          };
        });
      }

      return setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const error = validate({ object: state.address });

      if (error.isError) {
        return setNotification({
          message: 'Please select a address and enter your address details',
          title: 'Error',
          type: 'error',
        });
      }

      await handlePayment(
        {
          name: state.addressDetail,
          fee: state.address.fee,
        },
        state.note
      );

      setState({
        address: {
          name: '',
          fee: 0,
        },
        note: '',
        addressDetail: '',
      });
      onClose();
    },
    [state]
  );

  return (
    <section className={commons.overlay} onClick={onClose}>
      <form
        action="#"
        method="POST"
        className={styles.payment}
        onSubmit={onSubmit}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <Heading label="Payment" size="xl" className={styles.heading} />
        <div className={styles.address}>
          <div className={styles.wrapper}>
            <select
              name="address"
              value={`${state.address.fee}-${state.address.name}`}
              className={styles.addressSelect}
              onChange={handleChange}
            >
              <option value="">---- Address ----</option>
              {address.map((i, index) => (
                <option value={`${i.fee}-${i.name}`} key={index}>
                  {i.name}
                </option>
              ))}
            </select>

            <p className={styles.total}>
              <span>Total:</span>
              <span className={styles.value}>
                {convertVND(currentTotal + state.address.fee)}
              </span>
            </p>
          </div>

          <textarea
            value={state.addressDetail}
            name="addressDetail"
            placeholder="Enter address.."
            className={styles.addressDetail}
            onChange={handleChange}
          ></textarea>
        </div>

        <textarea
          name="note"
          placeholder="Enter note.."
          value={state.note}
          className={styles.note}
          onChange={handleChange}
        ></textarea>

        <div className={styles.action}>
          <Button type="submit" label="Done" variant="success" />
        </div>
      </form>
    </section>
  );
};

export default Payment;
