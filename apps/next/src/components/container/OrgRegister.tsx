import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Input, ButtonBig, LoadingStylishSpinner } from '@next/ui';
import { useRegisterOrgMutation } from '../../graphql/generated/graphql';

interface OrgRegisterInput {
  orgName: string;
  orgEmail: string;
  orgLocation: string;
  orgPhoneNumber: string;
}

const OrgRegister: FC = () => {
  const [orgRegister, { data, loading, error }] = useRegisterOrgMutation();

  const { register, handleSubmit } = useForm<OrgRegisterInput>();

  const onSubmit = async (input: OrgRegisterInput) => {
    console.log('input:', input);
    try {
      await orgRegister({
        variables: { ...input },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };
  console.log('data:', data);
  if (loading) return <LoadingStylishSpinner />;
  if (!loading && data?.registerOrg.org)
    // FIXME:replace to org setting page
    return <p>{data.registerOrg.org.orgName}の仮登録が成功しました！</p>;
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input<OrgRegisterInput>
          type="text"
          fieldLabel="団体名"
          label="orgName"
          required
          register={register}
        />
        <Input<OrgRegisterInput>
          type="email"
          fieldLabel="団体メールアドレス"
          label="orgEmail"
          required
          register={register}
        />
        <Input<OrgRegisterInput>
          type="text"
          fieldLabel="所在地"
          label="orgLocation"
          required
          register={register}
        />
        <Input<OrgRegisterInput>
          type="tel"
          fieldLabel="代表電話番号"
          label="orgPhoneNumber"
          required
          register={register}
        />
        <ButtonBig type="submit">登録</ButtonBig>
      </Form>
      {error ? <p>{error.message}</p> : null}
    </div>
  );
};

export { OrgRegister };
