import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '../../graphql/generated/graphql';
import {
  Form,
  Input,
  ButtonBig,
  InputTextarea,
  NotificationAlert,
  NotificationSuccess,
  NotificationCaution,
  LoadingStylishSpinner,
} from '@next/ui';

type UpdateUserProfileProps = {
  exName: string;
  exEmail: string;
  exDescription: string;
};

type UpdateUserProfileInput = {
  userName: string;
  email: string;
  description: string;
};

export const UpdateUserProfile: FC<UpdateUserProfileProps> = ({
  exDescription,
  exEmail,
  exName,
}) => {
  const [updateUser, { data, loading, error }] = useUpdateUserMutation();
  const { register, handleSubmit } = useForm<UpdateUserProfileInput>();

  const onSubmit = async (value: UpdateUserProfileInput) => {
    console.log('submittedValue:', value);
    const { description, email, userName } = value;
    try {
      await updateUser({
        variables: { userName, description, email },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      {error ? <NotificationAlert label="エラー！" content={error.message} /> : null}
      {data?.updateUser.error ? (
        <NotificationCaution label="エラー！" content={data.updateUser.error.message} />
      ) : null}
      {data?.updateUser.user ? (
        <NotificationSuccess label="変更成功！" content={data.updateUser.user.id} />
      ) : null}
      <Form overWriteCSS="mx-24 px-24 flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Input<UpdateUserProfileInput>
          type="text"
          fieldLabel="ニックネーム"
          label="userName"
          required={false}
          register={register}
          placeholder={exName}
        />
        <Input<UpdateUserProfileInput>
          type="text"
          fieldLabel="メールアドレス"
          label="email"
          required={false}
          register={register}
          placeholder={exEmail}
        />
        <InputTextarea<UpdateUserProfileInput>
          rows={3}
          cols={1}
          fieldLabel="自己紹介"
          label="description"
          required={false}
          register={register}
          placeholder={exDescription === 'UNKNOWN' ? '記入されていません' : exDescription}
        />
        {loading ? (
          <ButtonBig disabled type="submit">
            <LoadingStylishSpinner />
          </ButtonBig>
        ) : (
          <ButtonBig type="submit">設定を変更する</ButtonBig>
        )}
      </Form>
    </>
  );
};
