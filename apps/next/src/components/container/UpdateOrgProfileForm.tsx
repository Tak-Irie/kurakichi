import { VFC } from 'react';
import { useForm } from 'react-hook-form';

// import { useUpdateOrgMutation } from '@next/graphql';
import { Form, Input, InputTextarea, NotificationSet, ButtonOrLoading } from '@next/ui';

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
  userName: string;
  email: string;
  description: string;
  phoneNumber: string;
  location: string;
  homePage: string;
};

export const UpdateOrgProfileForm: VFC<UpdateOrgProfileProps> = (props) => {
  return <p>placer</p>;
  // const [updateOrg, { data, loading, error }] = useUpdateOrgMutation();
  // const { register, handleSubmit } = useForm<UpdateOrgProfileInput>();

  // const onSubmit = async (value: UpdateOrgProfileInput) => {
  //   // console.log('submittedValue:', value);
  //   const { description, email, userName } = value;
  //   try {
  //     await updateOrg({
  //       variables: { userName, description, email },
  //     });
  //   } catch (err) {
  //     console.log('err:', err);
  //   }
  // };

  // return (
  //   <>
  //     <NotificationSet
  //       sysErr={error}
  //       errData={data?.updateOrg.error}
  //       data={data?.updateOrg.user}
  //       errDataContent={data?.updateOrg.error?.message}
  //       dataContent={data?.updateOrg.user?.id}
  //     />
  //     <Form overWriteCSS="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
  //       <Input<UpdateOrgProfileInput>
  //         type="text"
  //         fieldLabel="ニックネーム"
  //         label="userName"
  //         required={false}
  //         register={register}
  //         placeholder={exName}
  //       />
  //       <Input<UpdateOrgProfileInput>
  //         type="text"
  //         fieldLabel="メールアドレス"
  //         label="email"
  //         required={false}
  //         register={register}
  //         placeholder={exEmail}
  //       />
  //       <InputTextarea<UpdateOrgProfileInput>
  //         rows={3}
  //         cols={1}
  //         fieldLabel="自己紹介"
  //         label="description"
  //         required={false}
  //         register={register}
  //         placeholder={exDescription === 'UNKNOWN' ? '記入されていません' : exDescription}
  //       />
  //       <div className="flex justify-end">
  //         <ButtonOrLoading
  //           loading={loading}
  //           buttonLabel="プロフィール設定を変更する"
  //           buttonType="submit"
  //         />
  //       </div>
  //     </Form>
  //   </>
  // );
};
