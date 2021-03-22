import { FC } from 'react';
import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';
import { MiddleButton } from '../presentational/atoms/Button';
import { useForm } from 'react-hook-form';
import { useUserForgetPasswordMutation } from '../../graphql/generated/graphql';

interface ForgetPasswordInput {
  email: string;
}

const ForgetPassword: FC = () => {
  const [forgetPassword, { data, loading, error }] = useUserForgetPasswordMutation();

  const { register, handleSubmit } = useForm();

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
        <Input name="email" type="email" labeled={true} register={register} />
        <MiddleButton type="submit">パスワード再登録</MiddleButton>
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
