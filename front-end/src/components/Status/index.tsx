// Styles
import styles from 'components/Status/index.module.css';

type StatusProps = {
  status: StatusType;
};

export type StatusType = 0 | 1 | 2 | 3 | 4 | 5;

const Status = (props: StatusProps) => {
  const { status } = props;
  const currentStatus = [
    'pending',
    'preparing',
    'delivering',
    'complete',
    'active',
    'deactive',
  ];

  return (
    <p className={`${styles.status} ${styles[currentStatus[status]]}`}>
      {currentStatus[status]}
    </p>
  );
};

export default Status;
