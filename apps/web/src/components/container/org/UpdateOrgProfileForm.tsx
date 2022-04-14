import { VFC } from 'react';
import { useForm } from 'react-hook-form';

type UpdateOrgProfileProps = {
  exName: string;
  exEmail: string;
  exDescription: string;
  exPhoneNumber: string;
  exLocation: string;
  exHomePage: string;
  orgId: string;
};

type UpdateOrgProfileInput = {
  orgName: string;
  email: string;
  description: string;
  phoneNumber: string;
  location: string;
  homePage: string;
  adminId: string;
};

export const UpdateOrgProfileForm: VFC<UpdateOrgProfileProps> = ({
  exDescription,
  exEmail,
  exHomePage,
  exLocation,
  exName,
  exPhoneNumber,
  orgId,
}) => {
  const [updateOrg, { data, loading, error }] = useUpdateOrgMutation();
  const { register, handleSubmit } = useForm<UpdateOrgProfileInput>();

  const onSubmit = async (values: UpdateOrgProfileInput) => {
    console.log('orgUpdateValue:', values);
    try {
      await updateOrg({
        variables: { orgId, orgInput: { ...values } },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <NotificationSet
        sysErr={error}
        errData={data?.updateOrg.error}
        data={data?.updateOrg.org}
        errDataContent={data?.updateOrg.error?.message}
        dataContent={data?.updateOrg.org?.id}
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
          register={register}
          placeholder={exName}
        />
        <Input<UpdateOrgProfileInput>
          type="email"
          fieldLabel="メールアドレス"
          label="email"
          required={false}
          register={register}
          placeholder={exEmail}
        />
        <InputTextarea<UpdateOrgProfileInput>
          rows={3}
          cols={1}
          fieldLabel="団体紹介"
          label="description"
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
          required={false}
          register={register}
          placeholder={exPhoneNumber}
        />
        <Input<UpdateOrgProfileInput>
          type="text"
          fieldLabel="所在地"
          label="location"
          required={false}
          register={register}
          placeholder={exLocation}
        />
        <Input<UpdateOrgProfileInput>
          type="url"
          fieldLabel="ホームページ"
          label="homePage"
          required={false}
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
