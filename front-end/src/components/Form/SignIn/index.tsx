import { useUser } from 'hooks';

// Components
import { Button, Heading, Input } from 'components/commons';

// Constants
import { TITLE } from '@constants';

// Types
import { FormProps } from 'components/Form';

// Styles
import styles from './index.module.css';

// Assets
import { Logo } from 'assets/images';
import { Xletter } from 'assets/icons';

const SignIn = ({ onClick, onChangeForm }: FormProps) => {
  const {
    user: { email, password } = { email: '', password: '' },
    changeData,
    signIn,
  } = useUser({
    initialize: {
      email: '',
      password: '',
    },
  });

  return (
    <section className={styles.overlay}>
      <form
        action="#"
        method="post"
        className={styles.formWrapper}
        onSubmit={signIn}
      >
        <div className={styles.formGroup}>
          <div className={styles.logo}>
            <img src={Logo} alt="" className={styles.image} />
            <Button
              label=""
              leftIcon={Xletter}
              className={styles.close}
              variant="secondary"
              onClick={onClick}
            />
          </div>
          <Heading label={TITLE.SIGNIN} className={styles.heading} size="xl" />
          <div className={styles.formFields}>
            <Input
              className={styles.input}
              value={email}
              placeholder="Enter email..."
              name="email"
              onChange={changeData}
            />
            <Input
              className={styles.input}
              type="password"
              value={password}
              placeholder="Ender password..."
              name="password"
              onChange={changeData}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.action}>
            <Button type="submit" label="SignIn" variant="primary" />
            <p className={styles.text}>
              If you {"don't"} have an account,{' '}
              <span className={styles.redirect} onClick={onChangeForm}>
                click here
              </span>
              .
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
