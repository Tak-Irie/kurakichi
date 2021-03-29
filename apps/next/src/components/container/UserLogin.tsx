import { FC } from 'react';
import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';
import { MiddleButton } from '../presentational/atoms/Button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useUserLoginMutation } from '../../graphql/generated/graphql';

interface UserLoginInput {
  email: string;
  password: string;
}

const UserLogin: FC = () => {
  const [userLogin, { data, loading, error }] = useUserLoginMutation();
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const handleMutation = async (value: UserLoginInput) => {
    try {
      await userLogin({
        variables: { ...value },
        fetchPolicy: 'no-cache',
      });
      router.replace('/private');
    } catch (err) {
      console.log('mutationErr:', err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleMutation)}>
        <Input name="email" type="email" labeled={true} register={register} />
        <Input name="password" type="password" labeled={true} register={register} />
        <MiddleButton type="submit">Login</MiddleButton>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data && <p>{data.login.message} data</p>}
    </>
  );
};

export { UserLogin };
