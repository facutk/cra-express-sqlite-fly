import { useNavigate, useParams } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  // console.log({ token, process: process.env.REACT_APP_TOKEN });
  if (token === process.env.REACT_APP_TOKEN) {
    document.cookie = `token=${token}`;
    return navigate('/');
  }
  return navigate('/login');
};

export default Auth;
