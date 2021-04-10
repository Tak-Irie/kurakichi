import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSendMessageMutation } from '../../graphql/generated/graphql';
import { Form, Input } from '@next/ui';
import {} from '@headlessui/react';

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
      <Form<sendMessageInput> onSubmit={onSubmit}>
        {({ register }) => (
          <>
            <Input {...register('textInput')} />
            <Input {...register('receiverId')} />
            <Input type="submit" />
          </>
        )}
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data && <p> done</p>}
    </>
  );
};
