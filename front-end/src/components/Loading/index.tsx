// Styles
import styles from 'components/Loading/index.module.css';

const Loading = ({ isShowText = true }: { isShowText?: boolean }) => {
  return (
    <section className={styles.loadingWrapper}>
      <div className={styles.fragment}>
        <div className={styles.loading}></div>
        {isShowText && <p className={styles.text}>Please wait a moment...</p>}
      </div>
    </section>
  );
};

export default Loading;
