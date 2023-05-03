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
  useState,
} from 'react';

// Components
import { Button, Heading, Input } from 'components/commons';

// Helpers
import { convertVND, validate } from 'helpers';

// Contexts
import { MESSAGES, REGEXPS } from '@constants';
type PaymentProps = {
  currentTotal: number;
  handlePayment: (
    _address: Address,
    _note: string,
    _phoneNumber: string
  ) => void;
  onClose: (_e?: MouseEvent) => void;
};

const Payment = (props: PaymentProps) => {
  const { currentTotal, handlePayment, onClose } = props;
  // const { setNotification } = useContext(NotificationContext);
  const [state, setState] = useState<{
    address: Address;
    addressDetail: string;
    note: string;
    phoneNumber: string;
  }>({
    address: {
      name: '',
      fee: 0,
    },
    note: '',
    addressDetail: '',
    phoneNumber: '',
  });
  const [errorField, setErrorField] = useState<{ [key: string]: string }>({});

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
    ) => {
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

      const obj: {
        [key: string]: string | number;
      } = {
        ...state.address,
        addressDetail: state.addressDetail,
      };

      if (state.phoneNumber) obj.phoneNumber = state.phoneNumber;

      const { isError, fields } = validate({
        object: obj,
        regexp: {
          phoneNumber: {
            regexp: REGEXPS.PHONE,
            message: MESSAGES.PHONE_FORMAT,
          },
        },
      });

      if (isError) {
        return setErrorField(fields);
      }

      await handlePayment(
        {
          name: state.addressDetail,
          fee: state.address.fee,
        },
        state.note,
        state.phoneNumber
      );

      setState({
        address: {
          name: '',
          fee: 0,
        },
        note: '',
        addressDetail: '',
        phoneNumber: '',
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
        <Heading label="Thanh toán" size="xl" className={styles.heading} />
        <div className={styles.address}>
          <div className={errorField.name && styles.error}>
            {errorField.name && <span>{errorField.name}</span>}
            <select
              name="address"
              value={`${state.address.fee}-${state.address.name}`}
              className={styles.addressSelect}
              onChange={handleChange}
            >
              <option value="">---- Chọn địa chỉ ----</option>
              {address.map((i, index) => (
                <option value={`${i.fee}-${i.name}`} key={index}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className={
              errorField.phoneNumber
                ? `${styles.phoneNumber} ${styles.error}`
                : styles.phoneNumber
            }
            data-error={errorField.phoneNumber}
          >
            <Input
              type="number"
              placeholder="Nhập số điện thoại..."
              name="phoneNumber"
              value={state.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.areaWrapper}>
          <div
            className={`${errorField.name && styles.error} ${styles.pseudo}`}
          >
            {errorField.name && <span>{errorField.name}</span>}
            <textarea
              className={styles.addressDetail}
              data-error={errorField.addressDetail}
              value={state.addressDetail}
              name="addressDetail"
              placeholder="Địa chỉ cụ thể..."
              onChange={handleChange}
            ></textarea>
          </div>
          <textarea
            name="note"
            placeholder="Ghi chú..."
            value={state.note}
            className={styles.note}
            onChange={handleChange}
          ></textarea>
        </div>

        <p className={styles.total}>
          <span>Total:</span>
          <span className={styles.value}>
            {convertVND(currentTotal + state.address.fee)}
          </span>
        </p>

        <div className={styles.action}>
          <Button type="submit" label="Done" variant="success" />
        </div>
      </form>
    </section>
  );
};

export default Payment;
