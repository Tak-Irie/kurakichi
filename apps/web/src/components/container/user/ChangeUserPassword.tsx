import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useChangeUserPasswordMutation } from '../../../graphql';

import { Form, Input } from '../../presentational/atoms';
import {
  ButtonOrLoading,
  NotificationSet,
} from '../../presentational/molecules';

type ChangeUserPasswordInput = {
  currentPass: string;
  newPass: string;
};

export const ChangeUserPassword: FC = () => {
  const [changePassword, { data, loading, error }] =
    useChangeUserPasswordMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangeUserPasswordInput>();

  const onSubmit = async (value: ChangeUserPasswordInput) => {
    try {
      await changePassword({
        variables: {
          input: { oldPassword: value.currentPass, newPassword: value.newPass },
        },
        fetchPolicy: 'no-cache',
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <NotificationSet
        sysErr={error}
        errData={data?.changePassword.message}
        data={data?.changePassword.result}
        errDataContent={data?.changePassword.message}
        dataContent={data?.changePassword.message}
      />
      <Form
        overWriteCSS="flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input<ChangeUserPasswordInput>
          type="password"
          fieldLabel="現在のパスワード"
          label="currentPass"
          helperText="現在のパスワードを入力して下さい"
          errMessage={errors.currentPass && errors.currentPass.message}
          required
          register={register}
        />
        <Input<ChangeUserPasswordInput>
          type="password"
          fieldLabel="新しいパスワード"
          label="newPass"
          helperText="パスワードは英数字を8文字以上を入力して下さい"
          errMessage={errors.newPass && errors.newPass.message}
          required
          register={register}
        />
        <div className="flex justify-end">
          <ButtonOrLoading
            loading={loading}
            buttonType="submit"
            buttonLabel="パスワードを変更する"
          />
        </div>
      </Form>
    </>
  );
};
