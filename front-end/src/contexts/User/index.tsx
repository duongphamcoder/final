import { ReactNode, useCallback, useState } from 'react';

import { SignIn } from 'components';

// Context
import { UserContext } from './context';

// Constants
import { STORE_KEY } from '@constants';
import SignUp from 'components/Form/SignUp';

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isUser, setIsUser] = useState(
    localStorage?.getItem(STORE_KEY.TOKEN) || ''
  );
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowSignIn, setIsShowSignIn] = useState(true);
  const openForm = useCallback((isShow = true) => {
    setIsShowForm(isShow);
  }, []);
  const changeForm = useCallback(() => {
    setIsShowSignIn((prev) => !prev);
  }, []);

  return (
    <UserContext.Provider
      value={{
        isUser,
        action: setIsUser,
        openForm,
        changeForm,
      }}
    >
      {children}

      {isShowForm && (
        <>
          {isShowSignIn ? (
            <SignIn onClick={() => openForm(false)} onChangeForm={changeForm} />
          ) : (
            <SignUp onClick={() => openForm(false)} onChangeForm={changeForm} />
          )}
        </>
      )}
    </UserContext.Provider>
  );
};

export default UserProvider;
