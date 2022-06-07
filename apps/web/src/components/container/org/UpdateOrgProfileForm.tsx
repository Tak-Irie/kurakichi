import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateOrgInfoMutation } from '../../../graphql/generated';
import {
  Any100chrRegExp,
  EmailRegExp,
  JapaneseAddressRegExp,
  OrgNameRegExp,
  PhoneNumberRegExp,
  URLRegExp,
} from '../../../lib';
import { Form } from '../../presentational/atoms';
import {
  ButtonOrLoading,
  Input,
  InputTextarea,
  InputValue,
} from '../../presentational/molecules';
import { NotificationSet } from '../../presentational/organisms';

type UpdateOrgProfileProps = {
  exName: string;
  exEmail: string;
  exDescription: string;
  exPhoneNumber: string;
  exLocation: string;
  exHomePage: string;
  orgId: string;
};

interface UpdateOrgProfileInput extends InputValue {
  orgName: string;
  email: string;
  description: string;
  phoneNumber: string;
  location: string;
  homePage: string;
  adminId: string;
}

export const UpdateOrgProfileForm: FC<UpdateOrgProfileProps> = ({
  exDescription,
  exEmail,
  exHomePage,
  exLocation,
  exName,
  exPhoneNumber,
  orgId,
}) => {
  const [updateOrg, { data, loading, error }] = useUpdateOrgInfoMutation();
  const { register, handleSubmit } = useForm<UpdateOrgProfileInput>();

  const onSubmit = async (values: UpdateOrgProfileInput) => {
    // console.log('orgUpdateValue:', values);
    try {
      await updateOrg({
        variables: { input: { orgId, ...values } },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <NotificationSet
        succeededContent={
          data?.updateOrg?.__typename === 'Org' ? '組織情報を更新しました' : ''
        }
        errContent={
          data?.updateOrg?.__typename === 'Errors'
            ? data?.updateOrg.applicationError?.message
            : ''
        }
        sysErrContent={error}
        errLabel={
          (data?.updateOrg?.__typename === 'Errors' &&
            data?.updateOrg.applicationError?.message) ||
          ''
        }
        sysErrLabel="システムトラブルが発生しました。管理者に連絡してください"
      />
      <Form
        overWriteCSS="flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input<UpdateOrgProfileInput>
          type="text"
          fieldLabel="団体名"
          label="orgName"
          required={false}
          pattern={OrgNameRegExp}
          register={register}
          placeholder={exName}
        />
        <Input<UpdateOrgProfileInput>
          type="email"
          fieldLabel="メールアドレス"
          label="email"
          required={false}
          pattern={EmailRegExp}
          register={register}
          placeholder={exEmail}
        />
        <InputTextarea<UpdateOrgProfileInput>
          rows={3}
          cols={1}
          fieldLabel="団体紹介"
          label="description"
          pattern={Any100chrRegExp}
          required={false}
          register={register}
          placeholder={
            exDescription === 'UNKNOWN' ? '記入されていません' : exDescription
          }
        />
        <Input<UpdateOrgProfileInput>
          type="tel"
          fieldLabel="電話番号"
          label="phoneNumber"
          pattern={PhoneNumberRegExp}
          required={false}
          register={register}
          placeholder={exPhoneNumber}
        />
        <Input<UpdateOrgProfileInput>
          type="text"
          fieldLabel="所在地"
          label="location"
          required={false}
          pattern={JapaneseAddressRegExp}
          register={register}
          placeholder={exLocation}
        />
        <Input<UpdateOrgProfileInput>
          type="url"
          fieldLabel="ホームページ"
          label="homePage"
          required={false}
          pattern={URLRegExp}
          register={register}
          placeholder={
            exHomePage === 'UNKNOWN' ? '登録されていません' : exHomePage
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
