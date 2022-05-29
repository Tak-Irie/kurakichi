import { NextPage } from 'next';
import {
  GoogleLoginButton,
  RegisterUserForm,
  YahooLoginButton,
} from '../../components/container';
import {
  TextSmall,
  TextWithDivider,
} from '../../components/presentational/atoms';
import { Disclosure } from '../../components/presentational/molecules';
import { FormPageTemplate } from '../../components/presentational/templates';

const UserRegisterPage: NextPage = () => (
  <FormPageTemplate
    title="新規登録"
    content={
      <>
        <div className="mt-10 ">
          <TextWithDivider content="ソーシャルログインを利用する" />
          <div className="grid grid-cols-2 mt-10 max-h-12">
            <div>
              <GoogleLoginButton />
            </div>
            <div>
              <YahooLoginButton />
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <Disclosure
              label="※ くらきちはソーシャルログインのご利用をおすすめしています"
              labelCSS="bg-yellow-50 text-yellow-800 rounded-full border border-gray-100"
              iconCSS="h-4 w-4 ml-1 text-yellow-800"
              content={
                <div className="p-2 bg-gray-50 border border-gray-200">
                  <TextSmall
                    content={
                      '1.\n上記のソーシャルログインは不正アクセスに対して強力です\n不審なアクセスがあった場合、すぐに知らせてくれます'
                    }
                  />
                  <TextSmall
                    content={'2.\n複数のパスワードを管理する必要がありません'}
                  />
                  <TextSmall
                    content={
                      '3.\nくらきちはあなたのIDとメールアドレスのみを取得します\nその他の個人情報は取得しません\n\n※上記のIDはソーシャルログインにのみ利用される特別なものです\nこれによってくらきちがあなたを特定することはできません'
                    }
                  />
                </div>
              }
            />
            <Disclosure
              label="※ GoogleやYahoo以外のログインを利用したい"
              labelCSS="bg-yellow-50 text-yellow-800 rounded-full border border-gray-100"
              iconCSS="h-4 w-4 ml-1 text-yellow-800"
              content={
                <div className="p-2 bg-gray-50 border border-gray-200">
                  <TextSmall
                    content={
                      'くらきちは第三者機関によって認定されたソーシャルログインのみを採用しています\n独自規格のログインは安全性を担保できませんので採用しておりません'
                    }
                  />
                  <TextSmall
                    content={
                      '\n認定リストは以下のサイトをご確認下さい。※外部サイト・英語'
                    }
                  />
                  <br />
                  <a
                    href="https://openid.net/certification/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline"
                  >
                    OpenID - OpenID Certification - Certified OpenID Providers
                  </a>
                </div>
              }
            />
          </div>
        </div>
        <div className="mt-10">
          <TextWithDivider content="くらきちユーザーとして登録する" />
          <RegisterUserForm />
        </div>
      </>
    }
  />
);

export default UserRegisterPage;
