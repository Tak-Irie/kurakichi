import { OrgMyPage, LoadingStylishSpinner, Tabs } from '@next/ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  useGetOrgQuery,
  useGetOrgsByMemberIdQuery,
  useMeQuery,
} from '../../graphql/generated/graphql';

const MyOrg: NextPage = () => {
  const { data, loading, error } = useGetOrgsByMemberIdQuery();
  const router = useRouter();
  const index = router.query.org as string;
  const [isShow, setShow] = useState(Number(index));

  if (loading) return <LoadingStylishSpinner />;

  if (error) return <p>{error.message}</p>;

  const orgs = data.getOrgsByMemberId.orgs;

  if (orgs.length < 2) {
    return <OrgMyPage org={orgs[0]} />;
  }

  const tabs = orgs.map((org, index) => {
    return { label: org.orgName, id: org.id, index: index };
  });
  return (
    <Tabs
      tabs={tabs}
      isShow={isShow}
      clickHandler={setShow}
      elements={orgs.map((org) => {
        return <OrgMyPage org={org} />;
      })}
    />
  );
};
export default MyOrg;
