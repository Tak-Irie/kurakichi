import { VFC } from 'react';

import { InquiryStatus, useUpdateInquiryStatusMutation } from '../../graphql';
import { ButtonOrLoading, NotificationSet } from '../presentational';

type UpdateInquiryStatusButtonProps = {
  inquiryId: string;
  inquiryStatus: InquiryStatus;
};

export const UpdateInquiryStatusButton: VFC<UpdateInquiryStatusButtonProps> = ({
  inquiryId,
  inquiryStatus,
}) => {
  const [updateStatus, { data, loading, error }] = useUpdateInquiryStatusMutation();

  const handleClick = async () => {
    await updateStatus({
      variables: {
        inquiryId,
        inquiryStatus,
      },
    });
  };

  return (
    <>
      <NotificationSet
        data={data?.updateInquiryStatus.inquiry}
        errData={data?.updateInquiryStatus.error}
        sysErr={error}
        dataLabel="対応状況を変更しました"
        errDataLabel={data?.updateInquiryStatus.error?.message}
        sysErrLabel={error?.message}
        showingMS={1000 * 3}
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
