import { RouteObject } from 'react-router-dom';

// Pages
import { AdminWrapper, Wrapper } from 'pages/commons';
import {
  AdminCategory,
  AdminHome,
  AdminLogin,
  AdminProduct,
  AdminUser,
} from 'pages/Admin';
import { Delivering, Orders, Profile } from 'pages/Users';

// Constants
import { ROUTES } from '@constants';
import { User } from 'layouts';

export const privateRoutes: RouteObject[] = [
  {
    path: ROUTES.USER,
    element: (
      <Wrapper>
        <User />
      </Wrapper>
    ),
    children: [
      {
        path: ROUTES.PROFILE,
        // eslint-disable-next-line react/no-children-prop
        element: <Profile />,
      },
      {
        path: ROUTES.ORDER,
        // eslint-disable-next-line react/no-children-prop
        element: <Orders />,
      },
      {
        path: ROUTES.DELIVERING,
        // eslint-disable-next-line react/no-children-prop
        element: <Delivering />,
      },
    ],
  },

  {
    path: ROUTES.ADMIN_HOME,
    element: <AdminWrapper />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },

      {
        path: ROUTES.ADMIN_PRODUCTS,
        // eslint-disable-next-line react/no-children-prop
        element: <AdminProduct />,
      },
      {
        path: ROUTES.ADMIN_USERS,
        // eslint-disable-next-line react/no-children-prop
        element: <AdminUser />,
      },
      {
        path: ROUTES.ADMIN_CATEGORIES,
        // eslint-disable-next-line react/no-children-prop
        element: <AdminCategory />,
      },
    ],
  },

  {
    path: ROUTES.LOGIN_ADMIN,
    element: <AdminLogin />,
  },
];
