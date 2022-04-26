import { FC } from 'react';
import { useUpdateInquiryStatusMutation } from '../../../graphql/generated';
import { InquiryStatusModel } from '../../../util';

import { ButtonOrLoading, NotificationSet } from '../../presentational';

type UpdateInquiryStatusButtonProps = {
  inquiryId: string;
  inquiryStatus: InquiryStatusModel;
};

export const UpdateInquiryStatusButton: FC<UpdateInquiryStatusButtonProps> = ({
  inquiryId,
  inquiryStatus,
}) => {
  const [updateStatus, { data, loading, error }] =
    useUpdateInquiryStatusMutation();

  const handleClick = async () => {
    await updateStatus({
      variables: {
        input: {
          inquiryId,
          inquiryStatus,
        },
      },
    });
  };

  return (
    <>
      <NotificationSet
        succeededContent={
          data?.updateInquiryStatus?.__typename === 'Inquiry'
            ? '対応状況を更新しました'
            : ''
        }
        errContent={
          data?.updateInquiryStatus?.__typename === 'Errors'
            ? data.updateInquiryStatus.applicationError?.message
            : ''
        }
        sysErrContent={error}
        sysErrLabel="システムトラブルが発生しました。管理者に連絡してください"
      />
      <ButtonOrLoading
        loading={loading}
        buttonType="button"
        buttonLabel="対応状況を更新する"
        onClick={handleClick}
      />
    </>
  );
};
