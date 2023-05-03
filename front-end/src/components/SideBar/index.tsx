import { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from 'hooks';

// Constants
import { ROUTES, STORE_KEY } from '@constants';

// Styles
import style from 'components/SideBar/index.module.css';

// components
import { Heading } from 'components/commons';

const SideBar = () => {
  const { removeValueKey } = useStore(STORE_KEY.TOKEN);

  return (
    <aside className={style.sidebar}>
      <Heading label="Welcome!" size="xl" className={style.heading} />
      <ul className={style.list}>
        <li className={style.item}>
          <NavLink
            to={`${ROUTES.USER}/${ROUTES.PROFILE}`}
            className={({ isActive }) =>
              isActive ? `${style.itemLink} ${style.active}` : style.itemLink
            }
          >
            Account details
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink
            to={`${ROUTES.USER}/orders`}
            className={({ isActive }) =>
              isActive ? `${style.itemLink} ${style.active}` : style.itemLink
            }
          >
            Orders
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink
            to={`${ROUTES.USER}/delivering`}
            className={({ isActive }) =>
              isActive ? `${style.itemLink} ${style.active}` : style.itemLink
            }
          >
            Delivering
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink
            to="/log-out"
            className={style.itemLink}
            onClick={(e: MouseEvent) => {
              e.preventDefault();

              removeValueKey();

              return window.location.replace(ROUTES.ROOT);
            }}
          >
            Log out
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
