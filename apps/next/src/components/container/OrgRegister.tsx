import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Input, MiddleButton } from '@next/ui';
import { useRegisterOrgMutation } from '../../graphql/generated/graphql';

interface OrgRegisterInput {
  orgName: string;
  orgEmail: string;
  orgLocation: string;
  orgPhoneNumber: string;
}

const OrgRegister: FC = () => {
  const [orgRegister, { data, error }] = useRegisterOrgMutation();

  const { register, handleSubmit } = useForm<OrgRegisterInput>();

  const onSubmit = async (input: OrgRegisterInput) => {
    // console.log('input:', input);
    try {
      await orgRegister({
        variables: { ...input },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input<OrgRegisterInput> type="text" label="orgName" required register={register} />
        <Input<OrgRegisterInput> type="email" label="orgEmail" required register={register} />
        <Input<OrgRegisterInput> type="text" label="orgLocation" required register={register} />
        <Input<OrgRegisterInput> type="tel" label="orgPhoneNumber" required register={register} />
        <MiddleButton type="submit">登録</MiddleButton>
      </Form>
      {data?.registerOrg.org && <p>{data.registerOrg.org.orgName}</p>}
      {data?.registerOrg.error && <p>{data.registerOrg.error.message}</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export { OrgRegister };
