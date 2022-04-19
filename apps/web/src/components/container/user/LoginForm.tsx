import idx from 'idx';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useGetUserMyInfoQuery, useLoginUserMutation } from '../../../graphql';

import { AuthContext } from '../../../util';
import { FAIL_TO_FETCH } from '../../../util/Constants';
import { Form, Input, LoadingSpinner } from '../../presentational/atoms';
import {
  ButtonOrLoading,
  NotificationSet,
} from '../../presentational/molecules';

interface UserLoginInput {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const router = useRouter();
  const { setAuthStatus } = useContext(AuthContext);
  const { data: userData, loading: userLoading } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-first',
    ssr: false,
  });

  const [loginUser, { data, loading, error }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({
    mode: 'onBlur',
  });

  const onSubmit = async (value: UserLoginInput) => {
    try {
      await loginUser({
        variables: { input: { ...value } },
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

  if (userData?.getUserByCookie?.user) {
    router.replace('/');
  }

  if (!userLoading && userData?.getUserByCookie?.user) {
    const _name = idx(userData.getUserByCookie.user, (_) => _.name);
    return (
      <>
        <NotificationSet
          data={_name || FAIL_TO_FETCH}
          errData={data?.loginUser?.errors?.applicationError?.message}
          sysErr={error}
          dataLabel="ログインしました！"
          errDataLabel={'ログインに失敗しました'}
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
    <div className="absolute z-10 w-screen h-screen">
      <LoadingSpinner />
    </div>
  );
};
