import { NextPage } from 'next';

import {
  GoogleLoginButton,
  LoginForm,
  YahooLoginButton,
} from '../../components/container';
import {
  FormPageTemplate,
  LinkNextjs,
  TextSmall,
  TextWithDivider,
} from '../../components/presentational';

const LoginPage: NextPage = () => (
  <FormPageTemplate
    title="ログイン"
    content={
      <div>
        <div>
          <TextWithDivider content="ソーシャルログイン" />
          <div className="grid grid-cols-2 mt-10 max-h-12">
            <div className="flex">
              <GoogleLoginButton />
            </div>
            <div className="flex justify-end">
              <YahooLoginButton />
            </div>
          </div>
          <div className="mt-5 space-y-4" />
        </div>
        <div className="mt-10">
          <TextWithDivider content="くらきちログイン" />
          <LoginForm />
        </div>
        <div className="flex justify-end mt-10">
          <LinkNextjs
            url="/auth/forgot-password"
            labelOrElement={
              <TextSmall
                color="yellow"
                content="※パスワードを忘れてしまった方はこちら"
              />
            }
            overwriteCSS="p-1 bg-yellow-50 rounded-md border border-gray-200 hover:shadow-sm hover:bg-yellow-100"
          />
        </div>
        <div className="flex justify-end mt-5">
          <LinkNextjs
            url="/auth/register"
            labelOrElement={
              <TextSmall color="yellow" content="※ユーザー新規登録はこちら" />
            }
            overwriteCSS="p-1 bg-yellow-50 rounded-md border border-gray-200 hover:shadow-sm hover:bg-yellow-100"
          />
        </div>
      </div>
    }
  />
);

export default LoginPage;
