import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useUserChangePasswordMutation } from '../../graphql/generated/graphql';
import { MiddleButton } from '../presentational/atoms/Button';

import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';

type ChangePasswordInput = {
  currentPass: string;
  newPass: string;
};

const UserChangePassword: FC = () => {
  const [changePassword, { data }] = useUserChangePasswordMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (value: ChangePasswordInput) => {
    try {
      await changePassword({
        variables: { CurrentPass: value.currentPass, NewPass: value.newPass },
        fetchPolicy: 'no-cache',
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="currentPass"
          type="password"
          label="現在のパスワード"
          labeled={true}
          register={register}
        />
        <Input
          name="newPass"
          type="password"
          label="新しいパスワード"
          labeled={true}
          register={register}
        />
        <MiddleButton type="submit">Change Password</MiddleButton>
      </Form>
      {data?.changePassword.message && <p>{data.changePassword.message}</p>}
    </>
  );
};

export { UserChangePassword };
