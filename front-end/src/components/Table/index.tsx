import { ReactNode, memo, useMemo } from 'react';

// Styles
import styles from 'components/Table/index.module.css';

type TableProps<T> = {
  data: T[];
  className?: string;
};

const Table = <T extends { _id: string | undefined; [key: string]: any }>(
  props: TableProps<T>
) => {
  const { data, className } = props;

  const table = useMemo(() => {
    const thead: ReactNode[] = [];

    const tbody = data.map((row, rowIndex) => {
      const [, ...rest] = Object.keys(row);

      return (
        <tr key={row._id} className={styles.row}>
          {rest.map((col, index) => {
            if (rowIndex === 0) {
              const th = (
                <th key={index} className={styles.headItem}>
                  {col}
                </th>
              );

              thead.push(th);
            }

            return (
              <td key={`${row._id}${index}`} className={styles.colItem}>
                {row[col]}
              </td>
            );
          })}
        </tr>
      );
    });

    return {
      tbody,
      thead,
    };
  }, [data]);

  return (
    <table className={`${styles.mainTable} ${className}`}>
      <thead>
        <tr className={styles.tableHead}>{table.thead}</tr>
      </thead>
      <tbody className={styles.tableContent}>{table.tbody}</tbody>
    </table>
  );
};

export default memo(Table);
