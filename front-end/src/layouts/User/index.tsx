// Styles
import { SideBar } from 'components';
import styles from 'layouts/User/index.module.css';
import { Outlet } from 'react-router-dom';
import container from 'styles/commons/index.module.css';

const User = () => {
  return (
    <section className={`${container.container} ${styles.wrapper}`}>
      <SideBar />

      <div className={styles.children}>
        <Outlet />
      </div>
    </section>
  );
};
export default User;
