import { NextPage } from 'next';
import Link from 'next/link';
import {
  ButtonWithIcon,
  IconsCog,
  IconsMail,
  LoadingSpinner,
} from '../../components/presentational/atoms';
import { UserMyPage, UserTemplate } from '../../components/presentational/templates';

const UserMyPagePrivatePage: NextPage = () => {
  // TODO:CQRS
  const { data, loading, error } = useGetUserPrivateInfoByCookieQuery({
    fetchPolicy: 'cache-first',
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data.getUserByCookie.user) {
    // console.log('MyPageData:', data.me.user);
    const { image, userName, belongOrgs, avatar, description, messages, email, belongSecureBases } =
      data.getUserByCookie.user;
    return (
      <UserTemplate
        avatar={avatar}
        image={image}
        userName={userName}
        headerButtons={
          <>
            <Link href="/user/setting" passHref>
              <a href="replace">
                <ButtonWithIcon type="button" label="アカウント設定" icon={<IconsCog />} />
              </a>
            </Link>
            <Link href="/user/message" passHref>
              <a href="replace">
                <ButtonWithIcon type="button" label="メッセージボックス" icon={<IconsMail />} />
              </a>
            </Link>
          </>
        }
        pageContents={
          <UserMyPage
            description={description}
            orgs={belongOrgs}
            messages={messages}
            email={email}
            secureBases={belongSecureBases}
          />
        }
      />
    );
  }
  return <p>{data.getUserByCookie.error.message}</p>;
};

export default UserMyPagePrivatePage;
