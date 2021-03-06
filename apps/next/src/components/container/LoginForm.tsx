import { VFC, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { yupRegisterUserAndLoginSchema } from '@kurakichi/node-util';
import { Form, Input, ButtonOrLoading, NotificationSet, LoadingSpinner } from '@next/ui';
import { useGetUserByCookieQuery, useLoginUserMutation } from '@next/graphql';
import { isServer, AuthContext } from '../../util';

interface UserLoginInput {
  email: string;
  password: string;
}

export const LoginForm: VFC = () => {
  const router = useRouter();
  const { setAuthStatus } = useContext(AuthContext);
  const { data: userData, loading: userLoading } = useGetUserByCookieQuery({
    skip: isServer(),
    ssr: false,
    fetchPolicy: 'cache-first',
  });

  const [loginUser, { data, loading, error }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({
    resolver: yupResolver(yupRegisterUserAndLoginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (value: UserLoginInput) => {
    try {
      await loginUser({
        variables: { ...value },
        fetchPolicy: 'no-cache',
      });
      setAuthStatus(true);
    } catch (err) {
      console.error('loginMutateErr:', err);
    }
  };

  if (userLoading) {
    return <p>loading</p>;
  }

  if (userData?.getUserByCookie.user) {
    router.replace('/');
  }

  if (!userLoading && !userData?.getUserByCookie.user) {
    return (
      <>
        <NotificationSet
          data={data?.login.user}
          errData={data?.login.error}
          sysErr={error}
          dataLabel="ログインしました！"
          errDataLabel={data?.login.error?.message}
        />
        <Form onSubmit={handleSubmit(onSubmit)} overWriteCSS="">
          <Input<UserLoginInput>
            type="email"
            fieldLabel="メールアドレス"
            label="email"
            required
            autoComplete="email"
            register={register}
            errMessage={errors.email && errors.email.message}
          />
          <Input<UserLoginInput>
            type="password"
            fieldLabel="パスワード"
            label="password"
            required
            autoComplete="current-password"
            register={register}
            errMessage={errors.password && errors.password.message}
          />
          <div className="flex justify-end">
            <ButtonOrLoading
              color="yellow"
              buttonType="submit"
              buttonLabel="ログイン"
              loading={loading}
            />
          </div>
        </Form>
      </>
    );
  }

  return (
    <div className="absolute z-10 h-screen w-screen">
      <LoadingSpinner />
    </div>
  );
};
