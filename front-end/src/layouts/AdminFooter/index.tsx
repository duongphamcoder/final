// Components
import { Heading } from 'components/commons';

// Styles
import styles from 'layouts/AdminFooter/index.module.css';

const AdminFooter = () => {
  return (
    <footer className={styles.mainFooter}>
      <Heading label="copyright by Duong Pham" size="lg" />
    </footer>
  );
};

export default AdminFooter;
