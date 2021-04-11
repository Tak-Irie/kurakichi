import { FC } from 'react';
import { MiddleButton, Input, Form } from '../presentational/atoms';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation, useMeLazyQuery } from '../../graphql/generated/graphql';

type UserRegisterInput = {
  email: string;
  password: string;
  userName: string;
};

export const RegisterUser: FC = () => {
  const [userRegister, { data, loading, error }] = useRegisterUserMutation();
  const [meQuery] = useMeLazyQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterInput>();

  const onSubmit = async (value: UserRegisterInput) => {
    console.log('registerValue:', value);
    try {
      await userRegister({
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
        <Input<UserRegisterInput> type="text" label="userName" register={register} required />
        <Input<UserRegisterInput> type="email" label="email" register={register} required />
        <Input<UserRegisterInput> type="password" label="password" register={register} required />
        <MiddleButton type="submit">ユーザー登録</MiddleButton>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data?.userRegister.user && <p>{data.userRegister.user.id} data</p>}
    </>
  );
};
