import { ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import useSWR from 'swr';

// Layouts
import { Footer, Header } from 'layouts';

// Styles
import styles from './index.module.css';

// Types
import { Category } from 'types';

// Constants
import { ENDPOINT } from '@constants';

// Components
import { Loading } from 'components';

const Wrapper = ({ children }: { children?: ReactNode }) => {
  const { data, isLoading } = useSWR<Category[]>(ENDPOINT.CATEGORIES);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header categories={data || []} />
      <main className={styles.mainContent}>
        <Suspense fallback={<p>Loading...</p>}>
          {children || <Outlet />}
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Wrapper;
