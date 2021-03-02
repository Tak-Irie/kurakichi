import { FC } from 'react';
import { useTestRegisterMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';
import { MiddleButton } from '../presentational/atoms/Button';
import { useForm } from 'react-hook-form';

interface UserRegisterInput {
  name: string;
}

const UserRegister: FC = () => {
  const [TestRegister, { data }] = useTestRegisterMutation();

  const { register, handleSubmit } = useForm();

  // const onSubmit = (a: any) => {
  //   console.log('what:', a);
  // };

  const onSubmit = async (value: any) => {
    try {
      const response = await TestRegister({
        variables: { registerName: value.name },
      });

      console.log(':', response);
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" type="text" labeled={true} register={register} />
        <Input name="email" type="email" labeled={true} register={register} />
        <Input
          name="password"
          type="password"
          labeled={true}
          register={register}
        />
        <MiddleButton type="submit">UserRegister</MiddleButton>
      </Form>
      {data && <p>{data.register.test.name}</p>}
    </>
  );
};

export { UserRegister };
