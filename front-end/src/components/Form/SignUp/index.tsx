import { useUser } from 'hooks';

// Components
import { Button, Heading, Input } from 'components/commons';

// Constants
import { ENDPOINT, TITLE } from '@constants';

// Types
import { FormProps } from 'components/Form';

// Styles
import styles from './index.module.css';

// Assets
import { Logo } from 'assets/images';
import { Xletter } from 'assets/icons';

const SignUp = ({ onClick, onChangeForm }: FormProps) => {
  const { user, errorField, changeData, signUp } = useUser({
    initialize: {
      email: '',
      password: '',
      phoneNumber: '',
      fullName: '',
    },
    endpoint: ENDPOINT.SIGNUP,
  });

  return (
    <section className={styles.overlay}>
      <form
        action="#"
        method="post"
        className={styles.formWrapper}
        onSubmit={signUp}
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
          <Heading label={TITLE.SIGNUP} className={styles.heading} size="xl" />
          <div className={styles.formFields}>
            <div
              className={
                errorField.fullName
                  ? `${styles.input} ${styles.error}`
                  : styles.input
              }
              data-error={errorField.fullName}
            >
              <Input
                value={user?.fullName}
                placeholder="Nhập tên..."
                name="fullName"
                onChange={changeData}
              />
            </div>
            <div
              className={
                errorField.phoneNumber
                  ? `${styles.input} ${styles.error}`
                  : styles.input
              }
              data-error={errorField.phoneNumber}
            >
              <Input
                type="number"
                value={user?.phoneNumber}
                placeholder="Nhập số điện thoại..."
                name="phoneNumber"
                onChange={changeData}
              />
            </div>
            <div
              className={
                errorField.email
                  ? `${styles.input} ${styles.error}`
                  : styles.input
              }
              data-error={errorField.email}
            >
              <Input
                value={user?.email}
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
                value={user?.password}
                placeholder="nhập password..."
                name="password"
                onChange={changeData}
              />
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.action}>
            <Button type="submit" label="Đăng ký" variant="primary" />
            <p className={styles.text}>
              Nếu bạn đã có tài khoản thì nhấn{' '}
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

export default SignUp;
