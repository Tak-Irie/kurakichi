import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSendInquiryMutation, InquiryCategory, InquiryStatus } from '@next/graphql';
import { ButtonBig, Form, InputTextarea, Select, NotificationSet, ButtonOrLoading } from '@next/ui';

type SendInquiryProps = {
  orgId: string;
  receiverId: string;
};

type SendInquiryInput = {
  textInput: string;
  category: InquiryCategory;
  status: InquiryStatus;
};

export const SendInquiryForm: FC<SendInquiryProps> = (props) => {
  const { register, handleSubmit } = useForm<SendInquiryInput>();
  const [sendInquiry, { data, error, loading }] = useSendInquiryMutation();

  const onSubmit = async (values: SendInquiryInput) => {
    // console.log('submitValue:', values);
    // console.log('submitValue:', values.category);
    try {
      await sendInquiry({
        variables: {
          orgId: props.orgId,
          receiverId: props.receiverId,
          textInput: values.textInput,
          category: values.category,
          status: InquiryStatus['Unread'],
        },
      });
      // console.log('data:', data);
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <div>
      <NotificationSet
        data={data?.sendInquiry.inquiry}
        errData={data?.sendInquiry.error}
        sysErr={error}
        dataLabel="送信に成功しました。返信をお待ち下さい"
        errDataLabel="送信に失敗しました"
        errDataContent={data?.sendInquiry.error?.message}
        sysErrLabel="システムに問題があります。管理者に連絡して下さい"
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Select<SendInquiryInput, InquiryCategory>
          fieldLabel="メッセージカテゴリー"
          label="category"
          options={[
            { label: '相談', value: InquiryCategory.Counsel },
            { label: '問い合わせ', value: InquiryCategory.Inquiry },
            { label: '業務連絡', value: InquiryCategory.Contact },
            { label: '所属申請', value: InquiryCategory.Application },
            { label: 'その他', value: InquiryCategory.Others },
          ]}
          required
          register={register}
        ></Select>
        <InputTextarea<SendInquiryInput>
          rows={3}
          cols={30}
          fieldLabel="メッセージ内容"
          label="textInput"
          required
          register={register}
        />
        <ButtonOrLoading loading={loading} buttonLabel="送信" buttonType="submit" />
      </Form>
    </div>
  );
};
