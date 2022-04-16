import { NextPage } from 'next';
import Link from 'next/link';
import {
  ChangeUserPassword,
  UpdateUserProfile,
} from '../../components/container';
import {
  ButtonWithIcon,
  IconsUser,
  LoadingSpinner,
} from '../../components/presentational/atoms';
import { UserTemplate } from '../../components/presentational/templates';
import { useGetUserMyInfoQuery } from '../../graphql/generated';

const UserSettingPrivatePage: NextPage = () => {
  const { data, loading, error } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-first',
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;
  if (data?.getUserByCookie?.errors)
    return <p>{data.getUserByCookie.errors.applicationError?.message}</p>;

  if (data?.getUserByCookie?.user) {
    const _user = data.getUserByCookie.user;
    return (
      <UserTemplate
        avatar={_user.avatarUrl || ''}
        image={_user.heroImageUrl || ''}
        userName={_user.name || ''}
        settingHeader={true}
        headerButtons={
          <Link href="/user/mypage" passHref>
            <a href="replace">
              <ButtonWithIcon
                type="button"
                label="マイページに戻る"
                icon={<IconsUser />}
              />
            </a>
          </Link>
        }
        pageContents={
          <>
            <div className="col-start-3 col-end-11 mt-10">
              <UpdateUserProfile
                exDescription={_user.selfIntro || ''}
                exEmail={_user.email || ''}
                exName={_user.name || ''}
              />
            </div>
            <div className="col-start-3 col-end-11 mt-10">
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
