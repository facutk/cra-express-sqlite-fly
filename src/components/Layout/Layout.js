import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Header from '../Header';

export const AuthContext = createContext({});

const Layout = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [{ token }] = useCookies(['token']);
  // const navigate = useNavigate();

  useEffect(() => {
    if (token === process.env.REACT_APP_TOKEN) {
      setIsAuth(true);
    }
  }, [token]);

  // if(!isAuth) navigate('/login');

  const value = {
    isAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      <Header />
      <Outlet />
    </AuthContext.Provider>
  );
};

export default Layout;
