import { ApolloError } from '@apollo/client';
import { FC } from 'react';

import {
  NotificationAlert,
  NotificationCaution,
  NotificationSuccess,
} from '../atoms';

type NotificationsProps = {
  succeededContent?: string;
  errContent?: string;
  sysErrContent?: ApolloError;
  succeededLabel?: string;
  errLabel?: string;
  sysErrLabel?: string;
  showingMS?: number;
};

/**
 * @desc succeededContent, errContent, sysErrContent is used for event trigger.
 */
export const NotificationSet: FC<NotificationsProps> = ({
  succeededContent,
  errContent,
  sysErrContent,
  succeededLabel = '成功！',
  errLabel = 'エラー！',
  sysErrLabel = 'エラー！',
  showingMS,
}) => {
  return (
    <>
      {sysErrContent ? (
        <NotificationAlert
          showingMS={showingMS}
          label={sysErrLabel}
          content={sysErrContent.message}
        />
      ) : null}
      {errContent ? (
        <NotificationCaution
          showingMS={showingMS}
          label={errLabel}
          content={errContent}
        />
      ) : null}
      {succeededContent ? (
        <NotificationSuccess
          showingMS={showingMS}
          label={succeededLabel}
          content={succeededContent}
        />
      ) : null}
    </>
  );
};
