import { EmailRegExp, PasswordRegExp } from '@kurakichi/domain';
import { NotificationSet } from 'components/presentational/organisms';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetUserMyInfoQuery,
  useRegisterUserMutation,
} from '../../../graphql';

import {
  Form,
  Input,
  InputValue,
  LoadingSpinner,
} from '../../presentational/atoms';
import { ButtonOrLoading } from '../../presentational/molecules';

interface UserRegisterInput extends InputValue {
  email: string;
  password: string;
}

export const RegisterUserForm: FC = () => {
  const router = useRouter();
  const { data: userData, loading: userLoading } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-only',
    ssr: false,
  });

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
        fetchPolicy: 'no-cache',
      });
    } catch (err) {
      console.error('registerMutateErr:', err);
    }
  };

  if (userLoading) {
    return <p>loading</p>;
  }

  if (userData?.getUserByCookie?.__typename === 'User') {
    router.replace('/');
  }

  if (userData?.getUserByCookie?.__typename === 'Errors' || null) {
    return (
      <>
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
      </>
    );
  }
  return (
    <div className="absolute z-10 w-screen h-screen">
      <LoadingSpinner />
    </div>
  );
};
