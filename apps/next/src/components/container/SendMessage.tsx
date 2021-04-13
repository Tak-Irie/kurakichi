import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSendMessageMutation } from '../../graphql/generated/graphql';
import { ButtonBig, Form, InputTextarea } from '@next/ui';

type SendMessageProps = {
  receiverId: string;
};

type SendMessageInput = {
  textInput: string;
};
export const SendMessage: FC<SendMessageProps> = (props) => {
  const { register, handleSubmit } = useForm<SendMessageInput>();
  const [sendMessage, { data, error, loading }] = useSendMessageMutation();

  const onSubmit = async (values: SendMessageInput) => {
    console.log('sendMessageValues:', values);
    try {
      await sendMessage({
        variables: {
          TextInput: values.textInput,
          ReceiverId: props.receiverId,
        },
      });
      console.log(':', data);
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputTextarea<SendMessageInput>
          rows={3}
          cols={30}
          fieldLabel="メッセージ内容"
          label="textInput"
          required
          register={register}
        />
        <ButtonBig type="submit">メッセージ送信</ButtonBig>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data && <p> done</p>}
    </div>
  );
};
