import idx from 'idx';
import type { NextPage } from 'next';
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

const MyPage: NextPage = () => {
  // TODO:CQRS
  const { data, loading, error } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-first',
    ssr: false,
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getUserByCookie?.__typename === 'Errors') {
    return <p>{data?.getUserByCookie?.applicationError?.message}</p>;
  }
  if (data?.getUserByCookie?.__typename === 'User') {
    // console.log('MyPageData:', data.me.user);
    const fetchedUser = data.getUserByCookie;
    const messages = idx(fetchedUser, (accessor) => accessor.messages.edges);

    return (
      <UserTemplate
        avatar={fetchedUser.avatarUrl || ''}
        image={fetchedUser.heroImageUrl || ''}
        userName={fetchedUser.name || ''}
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
            description={fetchedUser.selfIntro || ''}
            orgs={[]}
            messages={messages?.map((_) => _.node) || []}
            email={fetchedUser.email || ''}
            bases={[]}
          />
        }
      />
    );
  }
  return <p>something wrong</p>;
};

export default MyPage;
