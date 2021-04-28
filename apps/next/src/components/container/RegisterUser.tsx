import { FC } from 'react';
import { ButtonBig, Input, Form } from '../presentational/atoms';
import { useForm } from 'react-hook-form';
import {
  useRegisterUserMutation,
  useGetUserByCookieLazyQuery,
} from '../../graphql/generated/graphql';

type UserRegisterInput = {
  email: string;
  password: string;
  userName: string;
};

export const RegisterUser: FC = () => {
  const [registerUser, { data, loading, error }] = useRegisterUserMutation();
  const [meQuery] = useGetUserByCookieLazyQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterInput>();

  const onSubmit = async (value: UserRegisterInput) => {
    console.log('registerValue:', value);
    try {
      await registerUser({
        variables: { ...value },
        // fetchPolicy: 'no-cache',
      });
      meQuery();
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input<UserRegisterInput>
          type="text"
          fieldLabel="ユーザーネーム"
          label="userName"
          register={register}
          required
        />
        <Input<UserRegisterInput>
          type="email"
          fieldLabel="メールアドレス"
          label="email"
          register={register}
          required
        />
        <Input<UserRegisterInput>
          type="password"
          fieldLabel="パスワード"
          label="password"
          register={register}
          required
        />
        <ButtonBig type="submit">ユーザー登録</ButtonBig>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data?.registerUser.user && <p>{data.registerUser.user.id} data</p>}
      {data?.registerUser.error && <p>{data.registerUser.error.message} err</p>}
    </>
  );
};
