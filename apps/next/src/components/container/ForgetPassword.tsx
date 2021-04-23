import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useUserForgetPasswordMutation } from '../../graphql/generated/graphql';

import { Form, Input, ButtonBig } from '@next/ui';

interface ForgetPasswordInput {
  email: string;
}

const ForgetPassword: FC = () => {
  const [forgetPassword, { data, loading, error }] = useUserForgetPasswordMutation();

  const { register, handleSubmit } = useForm<ForgetPasswordInput>();

  const handleMutation = async (value: ForgetPasswordInput) => {
    try {
      await forgetPassword({
        variables: { forgetPasswordEmail: value.email },
        fetchPolicy: 'no-cache',
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleMutation)}>
        <Input<ForgetPasswordInput>
          label="email"
          fieldLabel="メールアドレス"
          type="email"
          required
          register={register}
        />
        <ButtonBig type="submit">パスワード再登録</ButtonBig>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data?.forgetPassword.result === true && (
        <p>入力されたアドレスにメールを送信しました。ご確認下さい。</p>
      )}
    </>
  );
};

export { ForgetPassword };
