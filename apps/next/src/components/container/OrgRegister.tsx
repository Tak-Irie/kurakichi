import { FC, useEffect } from 'react';
import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';
import { MiddleButton } from '../presentational/atoms/Button';
import { useForm } from 'react-hook-form';
import { useRegisterOrgMutation } from '../../graphql/generated/graphql';

interface OrgRegisterInput {
  orgName: string;
  orgEmail: string;
  orgLocation: string;
  orgPhoneNumber: string;
}

const OrgRegister: FC = () => {
  const [orgRegister, { data, error }] = useRegisterOrgMutation();

  const { register, handleSubmit } = useForm();

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

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="orgName" type="text" labeled={true} register={register} />
        <Input name="orgEmail" type="text" labeled={true} register={register} />
        <Input name="orgLocation" type="text" labeled={true} register={register} />
        <Input name="orgPhoneNumber" type="text" labeled={true} register={register} />
        <MiddleButton type="submit">OrgRegister</MiddleButton>
      </Form>
      {data?.registerOrg.org && <p>{data.registerOrg.org.orgName}</p>}
      {data?.registerOrg.error && <p>{data.registerOrg.error.message}</p>}

      {error && <p>{error.message}</p>}
    </div>
  );
};

export { OrgRegister };
