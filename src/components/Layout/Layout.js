import { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from '../Header';

export const AuthContext = createContext({});

const Layout = () => {
  const [isAuth, setIsAuth] = useState(false);
  // const [{ token }] = useCookies(['token']);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      await fetch('/profile').then((res) => res.json());

      setIsAuth(true);
    } catch {
      navigate('/login');
    }
  };

  // useEffect(() => {
  //   if (token === process.env.REACT_APP_TOKEN) {
  //     setIsAuth(true);
  //   }
  // }, [token]);

  // if(!isAuth) navigate('/login');

  useEffect(() => {
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
