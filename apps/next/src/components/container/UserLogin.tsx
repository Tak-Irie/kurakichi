import { FC } from 'react';
import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';
import { MiddleButton } from '../presentational/atoms/Button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useLoginUserMutation } from '../../graphql/generated/graphql';

interface UserLoginInput {
  email: string;
  password: string;
}

const UserLogin: FC = () => {
  const [loginUser, { data, loading, error }] = useLoginUserMutation();
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const handleMutation = async (value: UserLoginInput) => {
    try {
      await loginUser({
        variables: { ...value },
        fetchPolicy: 'no-cache',
      });
      router.replace('/myPage');
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
      {data && <p>{data?.login.user.userName} data</p>}
    </>
  );
};

export { UserLogin };
