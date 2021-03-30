import { NextPage } from 'next';
import { GoogleLoginButton } from '../components/container/GoogleLoginButton';
import { UserLogin } from '../components/container/UserLogin';
import { YahooLoginButton } from '../components/container/YahooLoginButton';
import Link from 'next/link';

const Login: NextPage = () => {
  return (
    <>
      <UserLogin />
      <GoogleLoginButton />
      <YahooLoginButton />
      <Link href="/ex/forgetPassword">
        <button>パスワードを忘れてしまった方</button>
      </Link>
    </>
  );
};

export default Login;
