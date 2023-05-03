import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';

// Providers
import { LoadingProvider, NotificationProvider, UserProvider } from 'contexts';

// Helpers
import { fetcher } from 'helpers';

// Styles
import 'styles/index.module.css';

// Router
import { routes } from 'routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <SWRConfig
    value={{
      fetcher,
    }}
  >
    <LoadingProvider>
      <NotificationProvider>
        <UserProvider>
          <RouterProvider router={routes} />
        </UserProvider>
      </NotificationProvider>
    </LoadingProvider>
  </SWRConfig>
  // </React.StrictMode>
);
