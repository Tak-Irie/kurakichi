import { NextPage } from 'next';
import { useGetMyInfoDetailQuery } from '../../graphql/generated/graphql';
import { UserSetting } from '@next/ui';

const MySetting: NextPage = () => {
  const { data, loading, error } = useGetMyInfoDetailQuery();

  return <UserSetting />;
};

export default MySetting;
