import { gql } from '@apollo/client';
import { VFC } from 'react';
import { useForm } from 'react-hook-form';

import { useReplyInquiryMutation } from '../../../graphql';
import {
  ButtonOrLoading,
  Form,
  InputTextarea,
  NotificationSet,
} from '../../presentational';

type ResponseInquiryProps = {
  replyTargetId: string;
  onClick?: () => void;
};

type InquiryInquiryInput = {
  textInput: string;
};
export const ReplyInquiryForm: VFC<ResponseInquiryProps> = ({
  replyTargetId,
  onClick,
}) => {
  const { register, handleSubmit } = useForm<InquiryInquiryInput>();
  const [replyInquiry, { data, error, loading }] = useReplyInquiryMutation();

  const onSubmit = async (values: InquiryInquiryInput) => {
    // console.log('resInquiryValues:', values);
    try {
      await replyInquiry({
        variables: {
          content: values.textInput,
          targetId: replyTargetId,
        },
        update: (cache, { data: { replyInquiry } }) => {
          // console.log('cache:', cache);
          // console.log('update:', replyInquiry);
          // console.log('treeId:', replyInquiry.inquiry.tree.id);
          cache.modify({
            id: 'InquiryTree:' + replyInquiry.inquiry.tree.id,
            fields: {
              treedInquiry(existing = []) {
                const newReply = cache.writeFragment({
                  data: replyInquiry.inquiry,
                  fragment: gql`
                    fragment Inquiry on InquiryTree {
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
        data={data?.replyInquiry.inquiry}
        errData={data?.replyInquiry.error}
        sysErr={error}
        dataContent="回答を送信しました!"
        errDataContent={data?.replyInquiry.error?.message}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputTextarea<InquiryInquiryInput>
          rows={3}
          cols={30}
          fieldLabel="返信内容"
          label="textInput"
          required
          register={register}
        />
        <span className="flex justify-end py-2 w-full">
          <ButtonOrLoading
            onClick={onClick}
            loading={loading}
            buttonType="submit"
            buttonLabel="返信する"
            color="yellow"
          />
        </span>
      </Form>
    </div>
  );
};
