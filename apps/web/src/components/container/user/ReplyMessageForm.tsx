import { Any100chrRegExp } from '@kurakichi/domain';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useReplyMessageMutation } from '../../../graphql';
import { Form, InputTextarea } from '../../presentational/atoms';
import { ButtonOrLoading } from '../../presentational/molecules';
import { NotificationSet } from '../../presentational/organisms';

type ResponseMessageProps = {
  replyTargetId: string;
  onClick?: () => void;
};

type ResponseMessageInput = {
  textInput: string;
};
export const ReplyMessageForm: FC<ResponseMessageProps> = ({
  replyTargetId,
  onClick,
}) => {
  const { register, handleSubmit } = useForm<ResponseMessageInput>();
  const [replyMessage, { data, error, loading }] = useReplyMessageMutation();

  const onSubmit = async (values: ResponseMessageInput) => {
    console.log('resMessageValues:', values);
    try {
      await replyMessage({
        variables: {
          input: {
            content: values.textInput,
            replyTargetId,
          },
        },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <div>
      <NotificationSet
        succeededContent="メッセージを送信しました！"
        errContent={
          data?.replyMessage?.__typename === 'Errors'
            ? data.replyMessage.applicationError?.message
            : ''
        }
        sysErrContent={error}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputTextarea<ResponseMessageInput>
          rows={3}
          cols={30}
          fieldLabel="メッセージ内容"
          label="textInput"
          pattern={Any100chrRegExp}
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
