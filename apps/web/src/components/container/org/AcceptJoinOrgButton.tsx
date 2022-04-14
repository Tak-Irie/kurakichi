import { gql } from '@apollo/client';
import { VFC } from 'react';

import { useAcceptJoinOrgMutation } from '../../../graphql';
import { ButtonOrLoading, NotificationSet } from '../../presentational';

type AcceptJoinOrgButtonProps = {
  requestUserId: string;
  requestedOrgId: string;
};

export const AcceptJoinOrgButton: VFC<AcceptJoinOrgButtonProps> = ({
  requestUserId,
  requestedOrgId,
}) => {
  const [acceptJoin, { data, loading, error }] = useAcceptJoinOrgMutation();

  const handleClick = async () => {
    await acceptJoin({
      variables: { requestUserId, requestedOrgId },
      update: (cache, result) => {
        cache.modify({
          id: 'Org:' + result.data.acceptJoinOrg.org.id,
          fields: {
            members(existing = []) {
              const newMember = cache.writeFragment({
                data: result.data.acceptJoinOrg.org.members,
                fragment: gql`
                  fragment Member on Org {
                    id
                  }
                `,
              });
              return [...existing, newMember];
            },
          },
        });
      },
    });
  };

  return (
    <>
      <NotificationSet
        data={data?.acceptJoinOrg.org}
        errData={data?.acceptJoinOrg.error}
        sysErr={error}
        dataLabel="申請受理が完了しました"
        errDataLabel={data?.acceptJoinOrg.error?.message}
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
