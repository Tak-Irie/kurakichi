import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Input } from '../../presentational/atoms';
import {
  ButtonOrLoading,
  NotificationSet,
} from '../../presentational/molecules';

interface ForgetPasswordInput {
  email: string;
}

export const ForgotPasswordForm: FC = () => {
  const [forgetPassword, { data, loading, error }] =
    useUserForgetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordInput>({
    resolver: yupResolver(yupEmailSchema),
    mode: 'onBlur',
  });

  const handleMutation = async (value: ForgetPasswordInput) => {
    console.log('value:', value);
    try {
      await forgetPassword({
        variables: { forgetPasswordEmail: value.email },
        fetchPolicy: 'no-cache',
      });
      console.log('forgotPassData:', data);
    } catch (err) {
      console.log('err:', err);
    }
  };
  return (
    <>
      <NotificationSet
        sysErr={error}
        errData={data?.forgetPassword.result === false ? true : undefined}
        data={data?.forgetPassword.result === true ? true : undefined}
        dataLabel={data?.forgetPassword.message}
        errDataLabel={data?.forgetPassword.message}
      />
      <Form onSubmit={handleSubmit(handleMutation)} overWriteCSS="">
        <Input<ForgetPasswordInput>
          label="email"
          fieldLabel="メールアドレス"
          type="email"
          required
          register={register}
          autoComplete="email"
          errMessage={errors.email && errors.email.message}
        />
        <span className="flex justify-end">
          <ButtonOrLoading
            color="yellow"
            loading={loading}
            buttonType="submit"
            buttonLabel="パスワード再登録"
          />
        </span>
      </Form>
    </>
  );
};
