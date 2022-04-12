import { Dispatch, SetStateAction, useEffect, VFC } from 'react';
import { useForm } from 'react-hook-form';
import { useSendMessageMutation } from '../../graphql/generated/graphql';
import { Form, InputTextarea, NotificationSet, ButtonOrLoading } from '@next/ui';

type SendMessageProps = {
  receiverId: string;
  onClick?: () => void;
  dispatcher?: Dispatch<SetStateAction<boolean>>;
};

type SendMessageInput = {
  textInput: string;
};
export const SendMessage: VFC<SendMessageProps> = ({ receiverId, dispatcher, onClick }) => {
  const { register, handleSubmit } = useForm<SendMessageInput>();
  const [sendMessage, { data, error, loading }] = useSendMessageMutation();

  const onSubmit = async (values: SendMessageInput) => {
    console.log('sendMessageValues:', values);
    try {
      await sendMessage({
        variables: {
          TextInput: values.textInput,
          ReceiverId: receiverId,
        },
      });
      console.log('returnData:', data);
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <div>
      <NotificationSet
        data={data?.sendMessage.message}
        errData={data?.sendMessage.error}
        sysErr={error}
        dataContent="メッセージを送信しました"
        errDataContent={data?.sendMessage.error?.message}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputTextarea<SendMessageInput>
          rows={3}
          cols={30}
          fieldLabel="メッセージ内容"
          label="textInput"
          required
          register={register}
        />
        <ButtonOrLoading
          onClick={onClick}
          loading={loading}
          buttonType="submit"
          buttonLabel="メッセージ送信"
        />
      </Form>
    </div>
  );
};
