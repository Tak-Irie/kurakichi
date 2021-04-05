import { OrgProfile } from '@next/ui';
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
    <OrgProfile
    orgName={data.getOrg.org.orgName}
    orgImg={data.getOrg.org.}
    orgIcon={data.getOrg.org.}
    email={}
    phone={}
    location={}
    homePage={}
    description={}
    member={data.getOrg.org.members}
    />
    </>
  );
};
