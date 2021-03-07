import { FC } from 'react';
import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';
import { MiddleButton } from '../presentational/atoms/Button';
import { useForm } from 'react-hook-form';
import {
  UserMeDocument,
  UserMeQuery,
  useUserLoginMutation,
} from '../../graphql/generated/graphql';

interface UserLoginInput {
  email: string;
  password: string;
}

const UserLogin: FC = () => {
  const [userLogin, { data, loading, error }] = useUserLoginMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (value: UserLoginInput) => {
    try {
      const response = await userLogin({
        variables: { ...value },
        update: (cache, { data }) => {
          cache.writeQuery<UserMeQuery>({
            query: UserMeDocument,
            data: {
              __typename: 'Query',
              me: { user: { id: data.login.user.id } },
            },
          });
        },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" type="email" labeled={true} register={register} />
        <Input
          name="password"
          type="password"
          labeled={true}
          register={register}
        />
        <MiddleButton type="submit">Login</MiddleButton>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message}</p>}
      {data && <p>{data.login.user.id}</p>}
    </>
  );
};

export { UserLogin };
