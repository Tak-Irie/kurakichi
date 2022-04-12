import { FC } from 'react';
import { ApolloError } from '@apollo/client';

import { NotificationAlert, NotificationCaution, NotificationSuccess } from '..';

type NotificationsProps = {
  data: any;
  errData: any;
  sysErr: ApolloError;
  dataContent?: string;
  errDataContent?: string;
  dataLabel?: string;
  errDataLabel?: string;
  sysErrLabel?: string;
  showingMS?: number;
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
  showingMS,
}) => {
  return (
    <>
      {sysErr ? (
        <NotificationAlert showingMS={showingMS} label={sysErrLabel} content={sysErr.message} />
      ) : null}
      {errData ? (
        <NotificationCaution showingMS={showingMS} label={errDataLabel} content={errDataContent} />
      ) : null}
      {data ? (
        <NotificationSuccess showingMS={showingMS} label={dataLabel} content={dataContent} />
      ) : null}
    </>
  );
};
