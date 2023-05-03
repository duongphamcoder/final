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
  const { user, changeData, signUp } = useUser({
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
            <Input
              className={styles.input}
              value={user?.fullName}
              placeholder="Enter name..."
              name="fullName"
              onChange={changeData}
            />
            <Input
              className={styles.input}
              type="number"
              value={user?.phoneNumber}
              placeholder="Ender phone number..."
              name="phoneNumber"
              onChange={changeData}
            />
            <Input
              className={styles.input}
              value={user?.email}
              placeholder="Enter email..."
              name="email"
              onChange={changeData}
            />
            <Input
              className={styles.input}
              type="password"
              value={user?.password}
              placeholder="Ender password..."
              name="password"
              onChange={changeData}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.action}>
            <Button type="submit" label="SignUp" variant="primary" />
            <p className={styles.text}>
              If you have an account,
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

export default SignUp;
