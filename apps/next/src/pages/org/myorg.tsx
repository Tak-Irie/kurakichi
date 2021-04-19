import { OrgMyPage, LoadingStylishSpinner } from '@next/ui';
import { NextPage } from 'next';
import {
  useGetOrgQuery,
  useGetOrgsByMemberIdQuery,
  useMeQuery,
} from '../../graphql/generated/graphql';

const MyOrg: NextPage = () => {
  const { data, loading, error } = useGetOrgsByMemberIdQuery();

  if (loading) return <LoadingStylishSpinner />;

  if (error) return <p>{error.message}</p>;

  if (data.getOrgsByMemberId.orgs.length < 2) {
    return <OrgMyPage org={data.getOrgsByMemberId.orgs[0]} />;
  }
};

export default MyOrg;
