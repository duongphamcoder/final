import { FormEvent, MouseEvent } from 'react';

// Styles
import styles from 'components/Details/index.module.css';
import container from 'styles/commons/index.module.css';
import { Button } from 'components/commons';

type Props = {
  data?: {
    [key: string]: any;
  };
  onSubmit?: (_e: FormEvent) => void;
  onUpdate?: (_e: MouseEvent) => void;
  onDelete?: (_e: MouseEvent) => void;
  onClose?: (_e: MouseEvent) => void;
};

const Details = (props: Props) => {
  const { data, onClose, onSubmit, onDelete, onUpdate } = props;

  return (
    <section className={container.overlay} onClick={onClose}>
      <form
        action="#"
        method="POST"
        className={styles.form}
        onClick={(e: MouseEvent) => e.stopPropagation()}
        onSubmit={onSubmit}
      >
        <div className={styles.wrapper}>
          {Object.entries(data || {}).map(([key, value], index) => {
            return (
              <div className={styles.formItem} key={index}>
                <label htmlFor={key} className={styles.label}>
                  {key}
                </label>
                {value}
              </div>
            );
          })}
        </div>

        <div className={styles.action}>
          <Button label="update" onClick={onUpdate} variant="secondary" />
          <Button label="delete" onClick={onDelete} variant="primary" />
        </div>
      </form>
    </section>
  );
};

export default Details;
