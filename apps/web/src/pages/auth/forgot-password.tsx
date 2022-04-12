import { NextPage } from 'next';

import { ImageLogo, TextH2, TextSmall } from '@next/ui';
import { ForgotPasswordForm } from '@next/container';

const ForgotPasswordPublicPage: NextPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-end-10 bg-white p-8 shadow my-4">
        <div className="grid grid-cols-4">
          <ImageLogo src="logo_temp.png" alt="くらきちロゴ" css="bg-yellow-50 rounded-full" />
          <div className="col-start-2 col-span-2 flex items-center">
            <TextH2 content="パスワード再登録" />
          </div>
        </div>
        <div className="mt-5">
          <TextSmall
            content={'ご登録のメールアドレスを入力して下さい\nパスワード再登録メールをお送りします'}
          />
        </div>
        <div className="mt-5">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPublicPage;
