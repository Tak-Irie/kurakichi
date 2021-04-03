import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSendMessageMutation } from '../../graphql/generated/graphql';
import { Form, Input, MiddleButton } from '@next/ui';

type sendMessageProps = {
  textInput: string;
  receiverId: string;
};

export const SendMessage: FC = () => {
  const { register, handleSubmit } = useForm();
  const [sendMessage, { data, loading, error }] = useSendMessageMutation();

  const submitHandler = async (value: sendMessageProps) => {
    try {
      await sendMessage({
        variables: { TextInput: value.textInput, ReceiverId: value.receiverId },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Input name="textInput" type="text" labeled={true} register={register} />
        <Input name="receiverId" type="text" labeled={true} register={register} />
        <MiddleButton type="submit">Send Message</MiddleButton>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data && <p> done</p>}
    </>
  );
};
