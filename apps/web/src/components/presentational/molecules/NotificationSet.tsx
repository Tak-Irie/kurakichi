import { ApolloError } from '@apollo/client';
import { FC } from 'react';

import {
  NotificationAlert,
  NotificationCaution,
  NotificationSuccess,
} from '..';

type NotificationsProps = {
  data?: string;
  errData?: string;
  sysErr?: ApolloError;
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
  dataLabel = '成功！',
  errDataLabel = 'エラー！',
  sysErrLabel = 'エラー！',
  showingMS,
}) => {
  return (
    <>
      {sysErr ? (
        <NotificationAlert
          showingMS={showingMS}
          label={sysErrLabel}
          content={sysErr.message}
        />
      ) : null}
      {errData ? (
        <NotificationCaution
          showingMS={showingMS}
          label={errDataLabel}
          content={errData}
        />
      ) : null}
      {data ? (
        <NotificationSuccess
          showingMS={showingMS}
          label={dataLabel}
          content={data}
        />
      ) : null}
    </>
  );
};
