import { FC, SyntheticEvent } from 'react';
import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';
import { MiddleButton } from '../presentational/atoms/Button';
import { useForm } from 'react-hook-form';
import {
  UserMeDocument,
  UserMeQuery,
  useUserLoginMutation,
  useUserMeLazyQuery,
  useUserMeQuery,
} from '../../graphql/generated/graphql';

interface UserLoginInput {
  email: string;
  password: string;
}

const UserLogin: FC = () => {
  const [userLogin, { data, loading, error }] = useUserLoginMutation();
  const [meQuery] = useUserMeLazyQuery();

  const { register, handleSubmit } = useForm();

  const handleMutation = async (value: UserLoginInput) => {
    try {
      await userLogin({
        variables: { ...value },
        // update: (cache, { data }) => {
        //   cache.writeQuery<UserMeQuery>({
        //     query: UserMeDocument,
        //     data: {
        //       __typename: 'Query',
        //       me: { user: { id: data.login.user.id } },
        //     },
        //   });
        // },
        fetchPolicy: 'no-cache',
      });
      meQuery();
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleMutation)}>
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
      {error && <p>{error.message} error</p>}
      {data && <p>{data.login.message} data</p>}
    </>
  );
};

export { UserLogin };
