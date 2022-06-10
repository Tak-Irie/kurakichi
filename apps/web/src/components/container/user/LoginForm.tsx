import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  GetUserMyInfoDocument,
  GetUserMyInfoQuery,
  useGetUserMyInfoQuery,
  useLoginUserMutation,
} from '../../../graphql';
import { EmailRegExp, PasswordRegExp } from '../../../lib';

import { Form, LoadingSpinner } from '../../presentational/atoms';
import {
  ButtonOrLoading,
  Input,
  InputValue,
} from '../../presentational/molecules';

interface UserLoginInput extends InputValue {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const router = useRouter();
  const { data: userData, loading: userLoading } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-first',
  });

  const [loginUser, { data, loading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({
    mode: 'onBlur',
  });

  const onSubmit = async (value: UserLoginInput) => {
    try {
      const res = await loginUser({
        variables: { input: { ...value } },
        update: (cache, result) => {
          const loggedInUser = result.data;
          if (loggedInUser?.loginUser.__typename === 'User') {
            cache.writeQuery<GetUserMyInfoQuery>({
              query: GetUserMyInfoDocument,
              data: {
                __typename: 'Query',
                getUserByCookie: {
                  __typename: 'User',
                  ...loggedInUser.loginUser,
                },
              },
            });
          }
        },
      });
      // console.log('res:', res);
      if (res.data?.loginUser.__typename === 'User') {
        router.replace('/');
      }
    } catch (err) {
      console.error('loginMutateErr:', err);
    }
  };

  if (userLoading || loading) {
    return <LoadingSpinner />;
  }

  if (userData?.getUserByCookie?.__typename === 'User') {
    router.replace('/');
  }

  if (data?.loginUser?.__typename === 'Errors') {
    return <p>{data.loginUser.applicationError?.message}</p>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} overWriteCSS="">
      <Input<UserLoginInput>
        type="email"
        fieldLabel="メールアドレス"
        label="email"
        required
        pattern={EmailRegExp}
        autoComplete="email"
        register={register}
        errMessage={errors.email && errors.email.message}
      />
      <Input<UserLoginInput>
        type="password"
        fieldLabel="パスワード"
        label="password"
        required
        pattern={PasswordRegExp}
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
  );
};
