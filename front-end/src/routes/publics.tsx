import { RouteObject } from 'react-router-dom';

// Pages
import { HomeUser, Products } from 'pages/Users';
import { Wrapper } from 'pages/commons';
import { ROUTES } from '@constants';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <HomeUser />,
      },
      {
        path: `/${ROUTES.MENU}/:category`,
        element: <Products />,
      },
    ],
  },

  {
    path: '*',
    element: <p>Not found</p>,
  },
];
