import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useUserChangePasswordMutation } from '../../graphql/generated/graphql';
import { Form, Input, MiddleButton } from '@next/ui';

type ChangeUserPasswordInput = {
  currentPass: string;
  newPass: string;
};

export const ChangeUserPassword: FC = () => {
  const [changePassword, { data }] = useUserChangePasswordMutation();
  const { register, handleSubmit } = useForm<ChangeUserPasswordInput>();

  const onSubmit = async (value: ChangeUserPasswordInput) => {
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
        <Input<ChangeUserPasswordInput>
          type="password"
          label="currentPass"
          required
          register={register}
        />
        <Input<ChangeUserPasswordInput>
          type="password"
          label="newPass"
          required
          register={register}
        />
        <MiddleButton type="submit">Change Password</MiddleButton>
      </Form>
      {data?.changePassword.message && <p>{data.changePassword.message}</p>}
    </>
  );
};
