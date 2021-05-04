import { NextPage } from 'next';
import Link from 'next/link';
import { UserMyPage, UserTemplate, ButtonWithIcon, IconsCog, IconsMail } from '@next/ui';
import { useGetUserPrivateInfoByCookieQuery } from '@next/graphql';

const UserPrivatePage: NextPage = () => {
  // TODO:CQRS
  const { data, loading, error } = useGetUserPrivateInfoByCookieQuery();

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  if (data.getUserByCookie.user) {
    // console.log('MyPageData:', data.me.user);
    const {
      image,
      userName,
      belongOrgs,
      avatar,
      description,
      messages,
      email,
      belongSecureBases,
    } = data.getUserByCookie.user;
    return (
      <UserTemplate
        avatar={avatar}
        image={image}
        userName={userName}
        headerButtons={
          <>
            <Link href="/user/setting">
              <a href="/user/setting">
                <ButtonWithIcon type="button" label="アカウント設定" icon={<IconsCog />} />
              </a>
            </Link>
            <Link href="/user/message">
              <a href="/user/message">
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

export default UserPrivatePage;
