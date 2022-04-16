import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '../../../graphql';

import {
  ButtonOrLoading,
  Form,
  Input,
  InputTextarea,
  NotificationSet,
} from '../../presentational';

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
    // console.log('submittedValue:', value);
    const { description, email, userName } = value;
    try {
      await updateUser({
        variables: {
          input: {
            name: userName || '',
            selfIntro: description || '',
            email: email || '',
          },
        },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <NotificationSet
        sysErr={error}
        errData={data?.updateUser?.errors?.applicationError?.message}
        data={'プロフィールが更新されました！'}
      />
      <Form
        overWriteCSS="flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          placeholder={
            exDescription === 'UNKNOWN' ? '記入されていません' : exDescription
          }
        />
        <div className="flex justify-end">
          <ButtonOrLoading
            loading={loading}
            buttonLabel="プロフィール設定を変更する"
            buttonType="submit"
          />
        </div>
      </Form>
    </>
  );
};
