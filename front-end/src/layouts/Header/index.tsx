import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

// HOCs
import { withErrorBoundary } from 'HOCS';

// Components
import { Button } from 'components/commons';

// Contexts
import { UserContext } from 'contexts/User/context';

// Types
import { Category } from 'types';

// Styles
import headerStyles from './index.module.css';

// Assets
import { Logo, User } from 'assets/images';
import { ROUTES } from '@constants';

type Headerprops = {
  categories: Category[];
};

const Header = (props: Headerprops) => {
  const { categories } = props;
  const { isUser, openForm } = useContext(UserContext);

  return (
    <header className={headerStyles.mainHeader}>
      <a href="/" className={headerStyles.logo}>
        <img src={Logo} alt="jollibee" className={headerStyles.image} />
      </a>
      <nav className={headerStyles.navWrapper}>
        <ul className={headerStyles.navbar}>
          {categories?.map((category) => {
            return (
              <li key={category._id} className={headerStyles.navItem}>
                <NavLink
                  to={`/${ROUTES.MENU}/${category._id}`}
                  className={({ isActive }) =>
                    !isActive
                      ? headerStyles.navlink
                      : `${headerStyles.navlink} ${headerStyles.active}`
                  }
                >
                  {category.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      {isUser ? (
        <div className={headerStyles.user}>
          <Link to="/user/profile">
            <img src={User} alt="" className={headerStyles.avatar} />
          </Link>
        </div>
      ) : (
        <div className={headerStyles.action}>
          <Button
            label="Đăng nhập"
            variant="secondary"
            onClick={() => openForm()}
          />
        </div>
      )}
    </header>
  );
};

export default withErrorBoundary(Header);
