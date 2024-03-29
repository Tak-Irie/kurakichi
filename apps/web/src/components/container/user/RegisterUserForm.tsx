import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  GetUserMyInfoDocument,
  GetUserMyInfoQuery,
  useRegisterUserMutation,
} from '../../../graphql';
import { EmailRegExp, PasswordRegExp } from '../../../lib';
import { NotificationSet } from '../../presentational/organisms';

import { Form } from '../../presentational/atoms';
import {
  ButtonOrLoading,
  Input,
  InputValue,
} from '../../presentational/molecules';

interface UserRegisterInput extends InputValue {
  email: string;
  password: string;
}

export const RegisterUserForm: FC = () => {
  const router = useRouter();
  // const { data: userData, loading: userLoading } = useGetUserMyInfoQuery({
  //   fetchPolicy: 'cache-only',
  // });

  const [registerUser, { data, loading, error }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterInput>({
    mode: 'onBlur',
  });

  const onSubmit = async (value: UserRegisterInput) => {
    // console.log('registerValue:', value);
    try {
      // avoid to cache input data, set no-cache
      await registerUser({
        variables: { input: { ...value } },
        update: (cache, result) => {
          const userData = result.data;
          if (userData?.registerUser.__typename === 'User') {
            cache.writeQuery<GetUserMyInfoQuery>({
              query: GetUserMyInfoDocument,
              data: {
                __typename: 'Query',
                getUserByCookie: {
                  __typename: 'User',
                  ...userData.registerUser,
                },
              },
            });
          }
        },
        // fetchPolicy: 'no-cache',
      });
    } catch (err) {
      console.error('registerMutateErr:', err);
    }
  };

  if (loading) {
    return <p>loading</p>;
  }

  if (data?.registerUser?.__typename === 'User') {
    // console.log('registered:', data.registerUser.name);
    router.replace('/');
  }

  // if (data?.registerUser?.__typename === 'Errors' || null) {
  return (
    <div>
      <NotificationSet
        succeededContent=""
        succeededLabel={
          data?.registerUser?.__typename === 'User'
            ? (data.registerUser.name as string)
            : ''
        }
        errContent={
          data?.registerUser?.__typename === 'Errors'
            ? data.registerUser.applicationError?.message
            : ''
        }
        sysErrContent={error}
      />
      <Form onSubmit={handleSubmit(onSubmit)} overWriteCSS="">
        <Input<UserRegisterInput>
          type="email"
          fieldLabel="メールアドレス"
          label="email"
          register={register}
          required
          pattern={EmailRegExp}
          autoComplete="email"
          errMessage={errors.email && errors.email.message}
        />
        <Input<UserRegisterInput>
          type="password"
          fieldLabel="パスワード"
          label="password"
          register={register}
          required
          pattern={PasswordRegExp}
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
    </div>
  );
};
