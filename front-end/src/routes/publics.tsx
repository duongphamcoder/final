import { RouteObject } from 'react-router-dom';

// Pages
import { HomeUser, Products } from 'pages/Users';
import { Wrapper } from 'pages/commons';

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
        path: ':category',
        element: <Products />,
      },
    ],
  },

  {
    path: '*',
    element: <p>Not found</p>,
  },
];
