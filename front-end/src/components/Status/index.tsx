// Styles
import styles from 'components/Status/index.module.css';

type StatusProps = {
  status: StatusType;
};

export type StatusType = 0 | 1 | 2 | 3 | 4 | 5;

const Status = (props: StatusProps) => {
  const { status } = props;
  const currentStatus = [
    {
      name: 'Đang đợi',
      variant: 'pending',
    },
    {
      name: 'Đang chuẩn bị',
      variant: 'preparing',
    },
    {
      name: 'Đang giao',
      variant: 'delivering',
    },
    {
      name: 'Hoàn thành',
      variant: 'complete',
    },
    {
      name: 'Hoạt động',
      variant: 'active',
    },
    {
      name: 'Tạm ngừng',
      variant: 'deactivated',
    },
  ];

  return (
    <p className={`${styles.status} ${styles[currentStatus[status].variant]}`}>
      {currentStatus[status].name}
    </p>
  );
};

export default Status;
