import { NextPage } from 'next';
import { UserSetting, LoadingStylishSpinner, ProfileHeaderSetting, Form } from '@next/ui';
import { ChangeUserPassword, UpdateUserProfile } from '@next/container';
import { useGetUserByCookieQuery } from '../../graphql/generated/graphql';

const MySetting: NextPage = () => {
  const { data, loading, error } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });

  if (loading) return <LoadingStylishSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data.getUserByCookie.user) {
    const { avatar, image, email, description, userName } = data.getUserByCookie.user;
    return (
      <div>
        <ProfileHeaderSetting avatarSrc={avatar} imageSrc={image} />
        <div className="m-10" />
        <UpdateUserProfile exDescription={description} exEmail={email} exName={userName} />
        <ChangeUserPassword />
      </div>
    );
  }
};
export default MySetting;
