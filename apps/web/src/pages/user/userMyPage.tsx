import idx from 'idx';
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
    ssr: false,
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getUserByCookie?.__typename === 'Errors') {
    return <p>{data?.getUserByCookie?.applicationError?.message}</p>;
  }
  if (data?.getUserByCookie?.__typename === 'User') {
    // console.log('MyPageData:', data.me.user);
    const _user = data.getUserByCookie;
    const messages = idx(_user, (idx) => idx.messages.edges);

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
            messages={messages?.map((_) => _.node) || []}
            email={_user.email || ''}
            bases={[]}
          />
        }
      />
    );
  }
  return <p>something wrong</p>;
};

export default userMyPage;
