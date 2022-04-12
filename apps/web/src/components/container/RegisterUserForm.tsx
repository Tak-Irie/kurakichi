import { VFC, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { yupRegisterUserAndLoginSchema } from '@kurakichi/node-util';
import { useRegisterUserMutation, useGetUserByCookieQuery } from '@next/graphql';
import { ButtonOrLoading, Input, Form, NotificationSet, LoadingSpinner } from '@next/ui';
import { isServer, AuthContext } from '../../util';

type UserRegisterInput = {
  email: string;
  password: string;
};

export const RegisterUserForm: VFC = () => {
  const router = useRouter();
  const { setAuthStatus } = useContext(AuthContext);

  const { data: userData, loading: userLoading } = useGetUserByCookieQuery({
    skip: isServer(),
    ssr: false,
    fetchPolicy: 'cache-first',
  });

  const [registerUser, { data, loading, error }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterInput>({
    resolver: yupResolver(yupRegisterUserAndLoginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (value: UserRegisterInput) => {
    // console.log('registerValue:', value);
    try {
      // avoid to cache input data, set no-cache
      await registerUser({
        variables: { ...value },
        fetchPolicy: 'no-cache',
      });
      setAuthStatus(true);
    } catch (err) {
      console.error('registerMutateErr:', err);
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
          data={null}
          errData={data?.registerUser.error}
          sysErr={error}
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
            helperText="8~30字の英数記号(.-_*!)を入力して下さい。英字の大小は区別されます"
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
  }
  return (
    <div className="absolute z-10 h-screen w-screen">
      <LoadingSpinner />
    </div>
  );
};
