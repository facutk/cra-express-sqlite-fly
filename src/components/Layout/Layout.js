import { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import Header from '../Header';

export const AuthContext = createContext({});

const Layout = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      if (token) {
        await fetch(`/auth/${token}`);
      }
      await fetch('/profile').then((res) => res.json());
      setIsAuth(true);
      return navigate('/');
    } catch {
      navigate('/login');
    }
  };

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
