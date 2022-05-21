import { FC } from 'react';
import { useAcceptToJoinOrgMutation } from '../../../graphql/generated';
import { ButtonOrLoading, NotificationSet } from '../../presentational';

type AcceptJoinOrgButtonProps = {
  requestUserId: string;
  requestedOrgId: string;
};

export const AcceptJoinOrgButton: FC<AcceptJoinOrgButtonProps> = ({
  requestUserId,
  requestedOrgId,
}) => {
  const [acceptJoin, { data, loading, error }] = useAcceptToJoinOrgMutation();

  const handleClick = async () => {
    await acceptJoin({
      variables: { input: { requestUserId, requestedOrgId } },
    });
  };

  return (
    <>
      <NotificationSet
        succeededContent={
          data?.acceptJoinOrg?.__typename === 'Org'
            ? 'プロフィールを更新しました'
            : ''
        }
        errContent={
          data?.acceptJoinOrg?.__typename === 'Errors'
            ? data.acceptJoinOrg.applicationError?.message
            : ''
        }
        sysErrContent={error}
        succeededLabel="申請受理が完了しました"
        errLabel={
          (data?.acceptJoinOrg?.__typename === 'Errors' &&
            data.acceptJoinOrg.applicationError?.message) ||
          ''
        }
        sysErrLabel="システムトラブルが発生しました。管理者に連絡してください"
      />
      <ButtonOrLoading
        buttonLabel="申請を受理する"
        buttonType="button"
        loading={loading}
        onClick={handleClick}
      />
    </>
  );
};
