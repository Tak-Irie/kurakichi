import { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { yupRegisterUserAndLoginSchema } from '@kurakichi/node-util';
import { useRegisterUserMutation, useGetUserByCookieLazyQuery } from '@next/graphql';
import { ButtonOrLoading, Input, Form, NotificationSet } from '@next/ui';

type UserRegisterInput = {
  email: string;
  password: string;
};

export const RegisterUserForm: FC = () => {
  const router = useRouter();
  const [registerUser, { data, loading, error }] = useRegisterUserMutation();
  const [meQuery] = useGetUserByCookieLazyQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterInput>({
    resolver: yupResolver(yupRegisterUserAndLoginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (value: UserRegisterInput) => {
    console.log('registerValue:', value);
    try {
      await registerUser({
        variables: { ...value },
        fetchPolicy: 'no-cache',
      });
      meQuery();
    } catch (err) {
      console.error('registerMutateErr:', err);
    }
  };

  return (
    <>
      <NotificationSet
        data={data?.registerUser.user}
        errData={data?.registerUser.error}
        sysErr={error}
        dataLabel="新規登録に成功しました！"
        errDataLabel={data?.registerUser.error?.message}
      />
      <Form onSubmit={handleSubmit(onSubmit)} overWriteCSS="">
        <Input<UserRegisterInput>
          type="email"
          fieldLabel="メールアドレス"
          label="email"
          register={register}
          required
          autoComplete="email"
          errMessage={errors.email && errors.email.message}
        />
        <Input<UserRegisterInput>
          type="password"
          fieldLabel="パスワード"
          label="password"
          register={register}
          required
          autoComplete="new-password"
          errMessage={errors.password && errors.password.message}
          helperText="8~30字の英数記号(.-_*!@)を入力して下さい。英字の大小は区別されます"
        />
        <div className="flex justify-end">
          <ButtonOrLoading
            color="yellow"
            buttonType="submit"
            buttonLabel="新規登録"
            loading={loading}
          />
        </div>
      </Form>
    </>
  );
};
