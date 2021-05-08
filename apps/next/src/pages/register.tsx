import { NextPage } from 'next';

import { ImageLogo, TextH2, TextWithDivider, TextSmall, Disclosure } from '@next/ui';
import { RegisterUserForm, GoogleLoginButton, YahooLoginButton } from '@next/container';
import { reactNewLineToBr } from '../util';

const RegisterPublicPage: NextPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-6 col-span-2 mt-4 flex justify-center items-center">
        <TextH2 content="新規登録" />
      </div>
      <div className="col-start-4 col-end-10 bg-white p-8 shadow my-4">
        <ImageLogo src="logo_temp.png" alt="くらきちロゴ" />
        <div className="mt-10">
          <TextWithDivider content="ソーシャルログインを利用する" />
          <div className="grid grid-cols-2 max-h-12 mt-10">
            <span className="flex">
              <GoogleLoginButton />
            </span>
            <span className="flex justify-end">
              <YahooLoginButton />
            </span>
          </div>
          <div className="mt-5">
            <Disclosure
              label={
                <TextSmall content="※ くらきちはソーシャルログインのご利用をおすすめしています" />
              }
              content="hi"
            />
            <Disclosure
              label={<TextSmall content="※ GoogleやYahoo以外のログインを利用したい" />}
              content={reactNewLineToBr('hi\nok?')}
            />
          </div>
        </div>
        <div className="mt-10">
          <TextWithDivider content="くらきちユーザーとして登録する" />
          <RegisterUserForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPublicPage;
