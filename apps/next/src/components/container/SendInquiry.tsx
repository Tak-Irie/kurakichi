import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  useSendInquiryMutation,
  InquiryCategory,
  InquiryStatus,
} from '../../graphql/generated/graphql';
import { ButtonBig, Form, InputTextarea, Select } from '@next/ui';

type SendInquiryProps = {
  orgId: string;
};

type SendInquiryInput = {
  textInput: string;
  category: InquiryCategory;
  status: InquiryStatus;
};

export const SendInquiry: FC<SendInquiryProps> = (props) => {
  const { register, handleSubmit } = useForm<SendInquiryInput>();
  const [sendInquiry, { data, error, loading }] = useSendInquiryMutation();

  const onSubmit = async (values: SendInquiryInput) => {
    // console.log('submitValue:', values);
    // console.log('submitValue:', values.category);
    try {
      await sendInquiry({
        variables: {
          receiverId: props.orgId,
          textInput: values.textInput,
          category: values.category,
          status: InquiryStatus['Unread'],
        },
      });
      console.log('data:', data);
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <div>
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
        <ButtonBig type="submit">メッセージ送信</ButtonBig>
      </Form>
      {loading && <p>loading!</p>}
      {error && <p>{error.message} error</p>}
      {data && <p> done</p>}
    </div>
  );
};
