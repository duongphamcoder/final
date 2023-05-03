import { MouseEvent } from 'react';

// Components
import Table from 'components/Table';
import { Button, ButtonProps, Heading } from 'components/commons';

// Styles
import styles from 'components/OrderDetail/index.module.css';
import container from 'styles/commons/index.module.css';

export type OrderDetailType = {
  _id: string;
  productName: string;
  quantity: number;
};

type OrderDetailProps = {
  data: OrderDetailType[];
  disable?: boolean;
  onPreparing?: (_event: MouseEvent) => void;
  onDelivering?: (_event: MouseEvent) => void;
  onComplete?: (_event: MouseEvent) => void;
  onClose?: (_event: MouseEvent) => void;
};

const OrderDetail = (props: OrderDetailProps) => {
  const {
    data,
    disable = false,
    onPreparing,
    onDelivering,
    onComplete,
    onClose,
  } = props;
  const buttons: ButtonProps[] = [
    {
      label: 'preparing',
      variant: 'info',
      onClick: onPreparing,
    },
    {
      label: 'delivering',
      variant: 'secondary',
      onClick: onDelivering,
    },
    {
      label: 'complete',
      variant: 'success',
      onClick: onComplete,
    },
  ];

  return (
    <section className={container.overlay} onClick={onClose}>
      <div
        className={styles.orderDetail}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <Heading label="Order detail" size="xl" className={styles.heading} />
        <Table data={data} className={styles.table} />

        {!disable && (
          <div className={styles.action}>
            {buttons.map((btn, index) => (
              <Button {...btn} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderDetail;
