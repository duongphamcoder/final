import { ChangeEvent, memo } from 'react';

// Styles
import styles from 'components/Card/AdminCard/index.module.css';
import { Heading } from 'components/commons';

type AdminCartType = {
  title: string;
  value: string;
  filter?: string;
  filterName?: string;
  isFilterDate?: boolean;
  changeFilter?: (_e: ChangeEvent<HTMLInputElement>) => void;
};

const AdminCard = (props: AdminCartType) => {
  const {
    title,
    value,
    filter,
    filterName,
    isFilterDate = false,
    changeFilter,
  } = props;

  return (
    <article className={styles.card}>
      <Heading label={title} className={styles.heading} size="md" />
      <p className={styles.value}>{value}</p>

      {isFilterDate && (
        <input
          type="date"
          className={styles.filter}
          name={filterName}
          value={filter}
          onChange={changeFilter}
        />
      )}
    </article>
  );
};

export default memo(AdminCard);
