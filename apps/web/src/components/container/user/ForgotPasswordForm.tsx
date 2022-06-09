import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useForgetUserPasswordMutation } from '../../../graphql/generated';
import { EmailRegExp } from '../../../lib';
import { Form } from '../../presentational/atoms';
import {
  ButtonOrLoading,
  Input,
  InputValue,
} from '../../presentational/molecules';
import { NotificationSet } from '../../presentational/organisms';

interface ForgetPasswordInput extends InputValue {
  email: string;
}

export const ForgotPasswordForm: FC = () => {
  const [forgetPassword, { data, loading, error }] =
    useForgetUserPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordInput>({
    mode: 'onBlur',
  });

  const handleMutation = async (value: ForgetPasswordInput) => {
    // console.log('value:', value);
    try {
      await forgetPassword({
        variables: { forgetPasswordEmail: value.email },
        fetchPolicy: 'no-cache',
      });
      // console.log('forgotPassData:', data);
    } catch (err) {
      console.log('err:', err);
    }
  };
  return (
    <>
      <NotificationSet
        succeededContent={
          data?.forgetPassword?.__typename === 'Succeeded'
            ? data.forgetPassword.succeeded
            : ''
        }
        errContent={
          data?.forgetPassword?.__typename === 'Errors'
            ? data.forgetPassword.applicationError?.message
            : ''
        }
        sysErrContent={error}
      />
      <Form onSubmit={handleSubmit(handleMutation)} overWriteCSS="">
        <Input<ForgetPasswordInput>
          label="email"
          fieldLabel="メールアドレス"
          type="email"
          required
          pattern={EmailRegExp}
          register={register}
          autoComplete="email"
          errMessage={errors.email && errors.email.message}
        />
        <div className="flex justify-end">
          <ButtonOrLoading
            color="yellow"
            loading={loading}
            buttonType="submit"
            buttonLabel="パスワード再登録"
          />
        </div>
      </Form>
    </>
  );
};
