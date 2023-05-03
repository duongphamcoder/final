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
    errorField,
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
            <div
              className={
                errorField.email
                  ? `${styles.input} ${styles.error}`
                  : styles.input
              }
              data-error={errorField.email}
            >
              <Input
                value={email}
                placeholder="Nhập email..."
                name="email"
                onChange={changeData}
              />
            </div>
            <div
              className={
                errorField.password
                  ? `${styles.input} ${styles.error}`
                  : styles.input
              }
              data-error={errorField.password}
            >
              <Input
                type="password"
                value={password}
                placeholder="Nhập password..."
                name="password"
                onChange={changeData}
              />
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.action}>
            <Button type="submit" label="Đăng nhập" variant="primary" />
            <p className={styles.text}>
              Nếu bạn chưa có tài khoản thì nhấn{' '}
              <span className={styles.redirect} onClick={onChangeForm}>
                vào đây
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
