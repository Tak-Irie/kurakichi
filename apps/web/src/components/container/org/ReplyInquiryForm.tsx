import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Any100chrRegExp } from '../../../util';

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
export const ReplyInquiryForm: FC<ResponseInquiryProps> = ({
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
          input: {
            content: values.textInput,
            replyTargetId: replyTargetId,
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
        succeededContent={
          data?.replyInquiry?.__typename === 'Inquiry' ? '返信しました' : ''
        }
        errContent={
          data?.replyInquiry?.__typename === 'Errors'
            ? data.replyInquiry.applicationError?.message
            : ''
        }
        sysErrContent={error}
        sysErrLabel="システムトラブルが発生しました。管理者に連絡してください"
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputTextarea<InquiryInquiryInput>
          rows={3}
          cols={30}
          fieldLabel="返信内容"
          label="textInput"
          pattern={Any100chrRegExp}
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
