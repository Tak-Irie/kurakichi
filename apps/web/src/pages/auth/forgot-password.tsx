import { NextPage } from 'next';
import { ForgotPasswordForm } from '../../components/container';
import {
  ImageLogo,
  TextH2,
  TextSmall,
} from '../../components/presentational/atoms';

const ForgotPasswordPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-4 col-end-10 p-8 my-4 bg-white shadow">
      <div className="grid grid-cols-4">
        <ImageLogo
          src="logo_temp.png"
          alt="くらきちロゴ"
          css="bg-yellow-50 rounded-full"
        />
        <div className="flex col-span-2 col-start-2 items-center">
          <TextH2 content="パスワード再登録" />
        </div>
      </div>
      <div className="mt-5">
        <TextSmall
          content={
            'ご登録のメールアドレスを入力して下さい\nパスワード再登録メールをお送りします'
          }
        />
      </div>
      <div className="mt-5">
        <ForgotPasswordForm />
      </div>
    </div>
  </div>
);

export default ForgotPasswordPage;
