import { NextPage } from 'next';
import { ForgetPassword } from '../components/container/ForgetPassword';
import { GoogleLoginButton } from '../components/container/GoogleLoginButton';
import { UserLogin } from '../components/container/UserLogin';
import { YahooLoginButton } from '../components/container/YahooLoginButton';

const Login: NextPage = () => {
  return (
    <>
      <UserLogin />
      <GoogleLoginButton />
      <YahooLoginButton />
      <ForgetPassword />
    </>
  );
};

export default Login;
