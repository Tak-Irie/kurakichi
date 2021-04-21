import { NextPage } from 'next';
import { useGetMyInfoDetailQuery, useMeQuery } from '../../graphql/generated/graphql';
import { UserSetting, LoadingStylishSpinner } from '@next/ui';

const MySetting: NextPage = () => {
  // const { data, loading, error } = useMeQuery();

  // if (loading) return <LoadingStylishSpinner />;
  // if (error) return <p>{error.message}</p>;

  // if (data.me.user) {
  //   const { avatar, image, userName } = data.me.user;
  //   return <UserSetting avatar={avatar} image={image} userName={userName} />;
  // }
  return <p>aaa</p>;
};

export default MySetting;
