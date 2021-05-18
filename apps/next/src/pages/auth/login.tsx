import { NextPage } from 'next';

import { LoginForm, GoogleLoginButton, YahooLoginButton, LinkNextjs } from '@next/container';
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
          <div className="mt-10 flex justify-end">
            <LinkNextjs
              linkUrl="/auth/forgot-password"
              linkLabel={
                <TextSmall textColor="yellow" content="※パスワードを忘れてしまった方はこちら" />
              }
              overwriteCSS="p-1 bg-yellow-50 rounded-md border border-gray-200 hover:shadow-sm hover:bg-yellow-100"
            />
          </div>
          <div className="mt-5 flex justify-end">
            <LinkNextjs
              linkUrl="/auth/register"
              linkLabel={<TextSmall textColor="yellow" content="※ユーザー新規登録はこちら" />}
              overwriteCSS="p-1 bg-yellow-50 rounded-md border border-gray-200 hover:shadow-sm hover:bg-yellow-100"
            />
          </div>
        </>
      }
    />
  );
};

export default Login;
