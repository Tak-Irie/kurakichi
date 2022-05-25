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

const UserSettingPage: NextPage = () => {
  const { data, loading, error } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-first',
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;
  if (data?.getUserByCookie?.__typename === 'Errors')
    return <p>{data.getUserByCookie.applicationError?.message}</p>;

  if (data?.getUserByCookie?.__typename === 'User') {
    const user = data.getUserByCookie;
    return (
      <UserTemplate
        avatar={user.avatarUrl || ''}
        image={user.heroImageUrl || ''}
        userName={user.name || ''}
        settingHeader
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
                exDescription={user.selfIntro || ''}
                exEmail={user.email || ''}
                exName={user.name || ''}
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
export default UserSettingPage;
