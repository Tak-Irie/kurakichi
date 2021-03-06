import { NextPage } from 'next';
import Link from 'next/link';

import { LoadingSpinner, ButtonWithIcon, UserTemplate, IconsUser } from '@next/ui';
import { ChangeUserPassword, UpdateUserProfile } from '@next/container';
import { useGetUserPrivateInfoByCookieQuery } from '@next/graphql';

const UserSettingPrivatePage: NextPage = () => {
  const { data, loading, error } = useGetUserPrivateInfoByCookieQuery({
    fetchPolicy: 'cache-first',
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getUserByCookie.user) {
    const { avatar, image, email, description, userName } = data.getUserByCookie.user;
    return (
      <UserTemplate
        avatar={avatar}
        image={image}
        userName={userName}
        settingHeader={true}
        headerButtons={
          <Link href="/user/mypage" passHref>
            <a href="replace">
              <ButtonWithIcon type="button" label="マイページに戻る" icon={<IconsUser />} />
            </a>
          </Link>
        }
        pageContents={
          <>
            <div className="mt-10 col-start-3 col-end-11">
              <UpdateUserProfile exDescription={description} exEmail={email} exName={userName} />
            </div>
            <div className="mt-10 col-start-3 col-end-11">
              <ChangeUserPassword />
            </div>
          </>
        }
      />
    );
  }
  return <LoadingSpinner />;
};
export default UserSettingPrivatePage;
