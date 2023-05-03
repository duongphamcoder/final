import { Outlet } from 'react-router-dom';

// Layouts
import { AdminFooter, AdminHeader } from 'layouts';

// Styles
import styles from 'pages/commons/AdminWrapper/index.module.css';
import container from 'styles/commons/index.module.css';
import { Suspense } from 'react';

const AdminWrapper = () => {
  return (
    <>
      <AdminHeader />
      <main className={`${styles.content} ${container.container}`}>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
      <AdminFooter />
    </>
  );
};

export default AdminWrapper;
