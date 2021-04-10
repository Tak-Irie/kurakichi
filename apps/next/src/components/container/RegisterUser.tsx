import { FC } from 'react';
import { MiddleButton, Input } from '../presentational/atoms';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation, useMeUserLazyQuery } from '../../graphql/generated/graphql';

type UserRegisterInput = {
  email: string;
  password: string;
  userName: string;
};

export const RegisterUser: FC = () => {
  const [userRegister, { data, loading, error }] = useRegisterUserMutation();
  const [meQuery] = useMeUserLazyQuery();
  const {
    register,
    handleSubmit,
    control,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input<UserRegisterInput> label="userName" register={register} required />
        <Input<UserRegisterInput> label="email" register={register} required />
        <Input<UserRegisterInput> label="password" register={register} required />
        <input type="submit" />
      </form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data?.userRegister.user && <p>{data.userRegister.user.id} data</p>}
    </>
  );
};
