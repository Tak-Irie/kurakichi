import { FC, useEffect } from 'react';
import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';
import { MiddleButton } from '../presentational/atoms/Button';
import { useForm } from 'react-hook-form';
import { useOrgRegisterMutation } from '../../graphql/generated/graphql';

interface OrgRegisterInput {
  orgName: string;
  location: string;
}

const OrgRegister: FC = () => {
  const [orgRegister, { data }] = useOrgRegisterMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (value: OrgRegisterInput) => {
    try {
      await orgRegister({
        variables: { registerOrgName: value.orgName, registerOrgLocation: value.location },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="orgName" type="text" labeled={true} register={register} />
        <Input name="location" type="text" labeled={true} register={register} />
        <MiddleButton type="submit">OrgRegister</MiddleButton>
      </Form>
      {data && <p>{data.registerOrg.message} ok!</p>}
    </>
  );
};

export { OrgRegister };
