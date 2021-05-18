import { ApolloError } from '@apollo/client';
import { FC } from 'react';

import { NotificationAlert, NotificationCaution, NotificationSuccess } from '@next/ui';

type NotificationsProps = {
  data: any;
  errData: any;
  sysErr: ApolloError;
  dataContent?: string;
  errDataContent?: string;
  dataLabel?: string;
  errDataLabel?: string;
  sysErrLabel?: string;
};

/**
 * @desc data, errData, sysErr is used for event trigger.
 */
export const NotificationSet: FC<NotificationsProps> = ({
  data,
  errData,
  sysErr,
  dataContent,
  errDataContent,
  dataLabel = '成功！',
  errDataLabel = 'エラー！',
  sysErrLabel = 'エラー！',
}) => {
  return (
    <>
      {sysErr ? <NotificationAlert label={sysErrLabel} content={sysErr.message} /> : null}
      {errData ? <NotificationCaution label={errDataLabel} content={errDataContent} /> : null}
      {data ? <NotificationSuccess label={dataLabel} content={dataContent} /> : null}
    </>
  );
};
