// Component
import { Heading } from 'components/commons';

// Constants
import { MESSAGES } from '@constants';

// Styles
import styles from 'components/Error/index.module.css';

const Error = () => {
  return (
    <div className={styles.empty}>
      <Heading
        label={MESSAGES.ERROR_TITLE}
        className={styles.emptyTitle}
        size="sm"
      />
      <p className={styles.emptyDescription}>{MESSAGES.ERROR_DESCRIPTION}</p>
    </div>
  );
};

export default Error;
