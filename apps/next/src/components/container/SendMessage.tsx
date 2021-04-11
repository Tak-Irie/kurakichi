import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSendMessageMutation } from '../../graphql/generated/graphql';
import { MiddleButton, Form, Input } from '@next/ui';

type sendMessageInput = {
  textInput: string;
  receiverId: string;
};

export const SendMessage: FC = () => {
  const { register, handleSubmit } = useForm<sendMessageInput>();
  const [sendMessage, { data, loading, error }] = useSendMessageMutation();

  const onSubmit = async (value: sendMessageInput) => {
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input<sendMessageInput> type="text" label="textInput" required register={register} />
        <Input<sendMessageInput> type="text" label="receiverId" required register={register} />
        <MiddleButton type="submit">ログイン</MiddleButton>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data && <p> done</p>}
    </>
  );
};
