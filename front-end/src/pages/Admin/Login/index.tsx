import { useUser } from 'hooks';

//Components
import { Button, Heading, Input } from 'components/commons';

// Styles
import styles from 'pages/Admin/Login/index.module.css';

// Constants
import { ENDPOINT } from '@constants';
import { withErrorBoundary, withReturnUser } from 'HOCS';

const AdminLogin = () => {
  const { user, changeData, signInWithAdmin } = useUser({
    initialize: {
      email: '',
      password: '',
    },
    endpoint: ENDPOINT.LOGIN_ADMIN,
  });

  return (
    <section className={styles.wrapper}>
      <form
        action="#"
        method="post"
        className={styles.formLogin}
        onSubmit={signInWithAdmin}
      >
        <Heading label="login" size="lg" className={styles.heading} />
        <Input
          placeholder="Enter email..."
          value={user?.email}
          name="email"
          onChange={changeData}
        />
        <Input
          type="password"
          placeholder="Enter password..."
          value={user?.password}
          name="password"
          onChange={changeData}
        />
        <Button
          type="submit"
          label="Login"
          size="large"
          className={styles.submit}
          variant="secondary"
        />
      </form>
    </section>
  );
};

export default withErrorBoundary(withReturnUser(AdminLogin));
