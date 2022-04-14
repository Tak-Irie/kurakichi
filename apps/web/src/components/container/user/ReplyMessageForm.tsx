import { VFC } from 'react';
import { useForm } from 'react-hook-form';

import { gql } from '@apollo/client';
import { useReplyMessageMutation } from '@next/graphql';
import { Form, InputTextarea } from '../../presentational/atoms';
import {
  ButtonOrLoading,
  NotificationSet,
} from '../../presentational/molecules';

type ResponseMessageProps = {
  replyTargetId: string;
  onClick?: () => void;
};

type ResponseMessageInput = {
  textInput: string;
};
export const ReplyMessageForm: VFC<ResponseMessageProps> = ({
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
          content: values.textInput,
          replyTargetId,
        },
        update: (cache, { data: { replyMessage } }) => {
          // console.log('cache:', cache);
          // console.log('update:', replyMessage);
          // console.log('treeId:', replyMessage.message.tree.id);
          cache.modify({
            id: 'MessageTree:' + replyMessage.message.tree.id,
            fields: {
              treedMessage(existing = []) {
                const newReply = cache.writeFragment({
                  data: replyMessage.message,
                  fragment: gql`
                    fragment Message on MessageTree {
                      id
                    }
                  `,
                });
                return [...existing, newReply];
              },
            },
          });
        },
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <div>
      <NotificationSet
        data={data?.replyMessage.message}
        errData={data?.replyMessage.error}
        sysErr={error}
        dataContent="メッセージを送信しました!"
        errDataContent={data?.replyMessage.error?.message}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputTextarea<ResponseMessageInput>
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
