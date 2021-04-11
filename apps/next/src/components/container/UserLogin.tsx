import { FC } from 'react';
import { Form, Input } from '../presentational/atoms';
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

  const { register, handleSubmit } = useForm<UserLoginInput>();

  const onSubmit = async (value: UserLoginInput) => {
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input<UserLoginInput> type="email" label="email" required register={register} />
        <Input<UserLoginInput> type="password" label="password" required register={register} />
        <MiddleButton type="submit">ログイン</MiddleButton>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data && <p>{data?.login.user.userName} data</p>}
    </>
  );
};

export { UserLogin };
