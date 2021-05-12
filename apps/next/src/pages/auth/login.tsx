import { NextPage } from 'next';
import Link from 'next/link';

import { LoginForm, GoogleLoginButton, YahooLoginButton } from '@next/container';
import { TextSmall, TextWithDivider, FormPageTemplate } from '@next/ui';

const Login: NextPage = () => {
  return (
    <FormPageTemplate
      formTitle="ログイン"
      formContent={
        <>
          <div>
            <TextWithDivider content="ソーシャルログイン" />
            <div className="grid grid-cols-2 max-h-12 mt-10">
              <span className="flex">
                <GoogleLoginButton />
              </span>
              <span className="flex justify-end">
                <YahooLoginButton />
              </span>
            </div>
            <div className="mt-5 space-y-4"></div>
          </div>
          <div className="mt-10">
            <TextWithDivider content="くらきちログイン" />
            <LoginForm />
          </div>
          <div className="mt-10">
            <Link href="/auth/forgot-password" passHref>
              <a href="replace" className="flex justify-end">
                <span className="p-1 bg-yellow-50 rounded-md border border-gray-200 hover:shadow-sm hover:bg-yellow-100">
                  <TextSmall
                    textColor="text-yellow-800"
                    content="※パスワードを忘れてしまった方はこちら"
                  />
                </span>
              </a>
            </Link>
          </div>
          <div className="mt-5">
            <Link href="/auth/register" passHref>
              <a href="replace" className="flex justify-end">
                <span className="p-1 bg-yellow-50 rounded-md border border-gray-200 hover:shadow-sm hover:bg-yellow-100">
                  <TextSmall textColor="text-yellow-800" content="※ユーザー新規登録はこちら" />
                </span>
              </a>
            </Link>
          </div>
        </>
      }
    />
  );
};

export default Login;
