import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSendInquiryMutation } from '../../../graphql/generated';
import {
  Any100chrRegExp,
  InquiryCategoryModel,
  InquiryStatusModel,
} from '../../../util';
import { Form, InputTextarea, Select } from '../../presentational/atoms';
import { ButtonOrLoading } from '../../presentational/molecules';
import { NotificationSet } from '../../presentational/organisms';

type SendInquiryProps = {
  orgId: string;
};

type SendInquiryInput = {
  content: string;
  category: InquiryCategoryModel;
  status: InquiryStatusModel;
};

export const SendInquiryForm: FC<SendInquiryProps> = ({ orgId }) => {
  const { register, handleSubmit } = useForm<SendInquiryInput>();
  const [sendInquiry, { data, error, loading }] = useSendInquiryMutation();

  const onSubmit = async (values: SendInquiryInput) => {
    // console.log('submitValue:', values);
    // console.log('submitValue:', values.category);
    try {
      await sendInquiry({
        variables: {
          input: {
            orgId,
            ...values,
          },
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
        succeededContent={
          data?.sendInquiry?.__typename === 'Inquiry' ? '送信しました' : ''
        }
        errContent={
          data?.sendInquiry?.__typename === 'Errors'
            ? data.sendInquiry.applicationError?.message
            : ''
        }
        sysErrContent={error}
        sysErrLabel="システムトラブルが発生しました。管理者に連絡してください"
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Select<SendInquiryInput, InquiryCategoryModel>
          fieldLabel="メッセージカテゴリー"
          label="category"
          options={[
            { label: '相談', value: 'COUNSEL' },
            { label: '問い合わせ', value: 'INQUIRY' },
            { label: '業務連絡', value: 'CONTACT' },
            { label: '所属申請', value: 'APPLICATION' },
            { label: 'その他', value: 'OTHERS' },
          ]}
          required
          register={register}
        ></Select>
        <InputTextarea<SendInquiryInput>
          rows={3}
          cols={30}
          fieldLabel="メッセージ内容"
          label="content"
          pattern={Any100chrRegExp}
          required
          register={register}
        />
        <span className="flex justify-end py-2 w-full border-gray-400">
          <ButtonOrLoading
            loading={loading}
            buttonLabel="送信"
            buttonType="submit"
          />
        </span>
      </Form>
    </div>
  );
};
