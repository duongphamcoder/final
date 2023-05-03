import { NavLink, Link } from 'react-router-dom';

// Components
import { Heading } from 'components/commons';

// Styles
import styles from 'layouts/AdminHeader/index.module.css';

// Assets
import { User } from 'assets/images';

const AdminHeader = () => {
  const checked = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <header className={styles.mainHeader}>
      <Link to="/admin" className={styles.heading}>
        <Heading label="Quản lý" size="xl" />
      </Link>
      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <NavLink to="products" className={checked}>
              sản phẩm
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="users" className={checked}>
              người dùng
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="categories" className={checked}>
              danh mục
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.user}>
        <Link to="/user/profile">
          <img src={User} alt="" className={styles.avatar} />
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
