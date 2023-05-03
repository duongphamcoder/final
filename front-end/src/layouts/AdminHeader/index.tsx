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
        <Heading label="Dashboard" size="xl" />
      </Link>
      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <NavLink to="products" className={checked}>
              products
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="users" className={checked}>
              users
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="categories" className={checked}>
              categories
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
