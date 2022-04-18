import { NextPage } from 'next';
import Link from 'next/link';
import {
  ButtonWithIcon,
  IconsCog,
  IconsMail,
  LoadingSpinner,
} from '../../components/presentational/atoms';
import {
  UserMyPage,
  UserTemplate,
} from '../../components/presentational/templates';
import { useGetUserMyInfoQuery } from '../../graphql';

const userMyPage: NextPage = () => {
  // TODO:CQRS
  const { data, loading, error } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-first',
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getUserByCookie?.user) {
    // console.log('MyPageData:', data.me.user);
    const _user = data.getUserByCookie.user;

    return (
      <UserTemplate
        avatar={_user.avatarUrl || ''}
        image={_user.heroImageUrl || ''}
        userName={_user.name || ''}
        headerButtons={
          <>
            <Link href="/user/setting" passHref>
              <a href="replace">
                <ButtonWithIcon
                  type="button"
                  label="アカウント設定"
                  icon={<IconsCog />}
                />
              </a>
            </Link>
            <Link href="/user/message" passHref>
              <a href="replace">
                <ButtonWithIcon
                  type="button"
                  label="メッセージボックス"
                  icon={<IconsMail />}
                />
              </a>
            </Link>
          </>
        }
        pageContents={
          <UserMyPage
            description={_user.selfIntro || ''}
            orgs={[]}
            messages={_user.messages?.edges || []}
            email={_user.email || ''}
            secureBases={[]}
          />
        }
      />
    );
  }
  return <p>{data?.getUserByCookie?.errors?.applicationError?.message}</p>;
};

export default userMyPage;
