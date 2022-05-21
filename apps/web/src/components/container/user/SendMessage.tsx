import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSendMessageMutation } from '../../../graphql/generated';
import { Any100chrRegExp } from '../../../lib';
import { Form, InputTextarea } from '../../presentational/atoms';
import { ButtonOrLoading } from '../../presentational/molecules';
import { NotificationSet } from '../../presentational/organisms';

type SendMessageProps = {
  receiverId: string;
  onClick?: () => void;
};

type SendMessageInput = {
  textInput: string;
};
export const SendMessage: FC<SendMessageProps> = ({ receiverId, onClick }) => {
  const { register, handleSubmit } = useForm<SendMessageInput>();
  const [sendMessage, { data, error, loading }] = useSendMessageMutation();

  const onSubmit = async (values: SendMessageInput) => {
    // console.log('sendMessageValues:', values);
    try {
      await sendMessage({
        variables: {
          input: {
            content: values.textInput,
            receiverId,
          },
        },
      });
      // console.log('returnData:', data);
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <div>
      <NotificationSet
        succeededContent={
          data?.sendMessage?.__typename === 'Message'
            ? 'メッセージを送信しました！'
            : ''
        }
        errContent={
          data?.sendMessage?.__typename === 'Errors'
            ? data.sendMessage.applicationError?.message
            : ''
        }
        sysErrContent={error}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputTextarea<SendMessageInput>
          rows={3}
          cols={30}
          fieldLabel="メッセージ内容"
          label="textInput"
          required
          pattern={Any100chrRegExp}
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
