import { FC } from 'react';
import { useGetOrgQuery } from '../../graphql/generated/graphql';
import { useGetIdFromUrl } from '../../util/useGetId';

type GetOrgDetailProps = {
  some?: string;
};

export const GetOrgDetail: FC<GetOrgDetailProps> = () => {
  const orgId = useGetIdFromUrl();
  const { data, loading, error } = useGetOrgQuery({
    skip: orgId === 'none',
    variables: { OrgId: orgId },
  });

  return (
    <>
      <p>a</p>
      <p>a</p>
    </>
  );
};
