import { NextPage } from 'next';
import { LoadingStylishSpinner, ProfileHeaderSetting, Form } from '@next/ui';
import { ChangeUserPassword, UpdateUserProfile } from '@next/container';
import { useGetUserByCookieQuery } from '../../graphql/generated/graphql';

const MySetting: NextPage = () => {
  const { data, loading, error } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });

  if (loading) return <LoadingStylishSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getUserByCookie.user) {
    const { avatar, image, email, description, userName } = data.getUserByCookie.user;
    return (
      <div className="grid grid-cols-12">
        <div className="col-span-full">
          <ProfileHeaderSetting avatarSrc={avatar} imageSrc={image} />
        </div>
        <div className="mt-10 col-start-3 col-end-11">
          <UpdateUserProfile exDescription={description} exEmail={email} exName={userName} />
        </div>
        <div className="mt-10 col-start-3 col-end-11">
          <ChangeUserPassword />
        </div>
      </div>
    );
  }
  return <LoadingStylishSpinner />;
};
export default MySetting;
