import { NextPage } from 'next';
import { GoogleLoginButton } from '../components/container/GoogleLoginButton';
import { UserLogin } from '../components/container/UserLogin';
import { YahooLoginButton } from '../components/container/YahooLoginButton';

const Login: NextPage = () => {
  return (
    <>
      <UserLogin />
      <GoogleLoginButton />
      <YahooLoginButton />
    </>
  );
};

export default Login;
