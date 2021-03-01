import { FC } from 'react';
import { useTestRegisterMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';

import { Form } from '../presentational/molecules/Form';
import { Input } from '../presentational/atoms/Input';
import { MiddleButton } from '../presentational/atoms/Button';
import { useForm } from 'react-hook-form';

interface IFormInput {
  name: string;
}

const RegisterTest: FC = () => {
  const router = useRouter();

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
        <Input name="name" type="text" labeled={false} register={register} />
        <MiddleButton type="submit">Post test!</MiddleButton>
      </Form>
      {data && <p>{data.register.test.name}</p>}

      {/* <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="name" ref={register} />
          <input type="submit" />
        </form>
      </div> */}
    </>
  );
};

export { RegisterTest };
