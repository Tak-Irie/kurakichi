import { FC } from 'react';
import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';
import { MiddleButton } from '../presentational/atoms/Button';
import { useForm } from 'react-hook-form';
import { useUserMeLazyQuery, useUserRegisterMutation } from '../../graphql/generated/graphql';

interface UserRegisterInput {
  email: string;
  password: string;
  username: string;
}

const OrgRegister: FC = () => {
  const [userRegister, { data, loading, error }] = useUserRegisterMutation();
  const [meQuery] = useUserMeLazyQuery();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (value: UserRegisterInput) => {
    try {
      await userRegister({
        variables: { ...value },
        fetchPolicy: 'no-cache',
      });
      meQuery();
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="username" type="text" labeled={true} register={register} />
        <Input name="email" type="email" labeled={true} register={register} />
        <Input name="password" type="password" labeled={true} register={register} />
        <MiddleButton type="submit">OrgRegister</MiddleButton>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data && <p>{data.userRegister.message} data</p>}
    </>
  );
};

export { OrgRegister };
