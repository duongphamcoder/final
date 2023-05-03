import { MouseEvent } from 'react';

// Components
import { Button, Heading } from 'components/commons';

// Styles
import styles from 'components/Popup/index.module.css';

export type PopupProps = {
  title?: string;
  description?: string;
  onAccept?: (_event: MouseEvent) => void;
  onCancel?: (_event: MouseEvent) => void;
};

const Popup = (props: PopupProps) => {
  const { title, description, onAccept, onCancel } = props;

  return (
    <section className={styles.overlay}>
      <div className={styles.content}>
        <Heading label={title} />
        <p className={styles.description}>{description}</p>
        <div className={styles.action}>
          <Button label="Cancel" width="w-lg" onClick={onCancel} />
          <Button
            label="Ok"
            width="w-lg"
            variant="primary"
            onClick={onAccept}
          />
        </div>
      </div>
    </section>
  );
};

export default Popup;
