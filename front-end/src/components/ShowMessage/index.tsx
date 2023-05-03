// Styles
import styles from 'components/ShowMessage/index.module.css';
import { Heading } from 'components/commons';

type ShowMessageProps = {
  message: string;
  className?: string;
};

const ShowMessage = ({ message, className }: ShowMessageProps) => {
  return (
    <section className={`${styles.messageWrapper} ${className}`}>
      <Heading className={styles.message} label={message} size="xl" />
    </section>
  );
};

export default ShowMessage;
