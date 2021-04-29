import { NextPage } from 'next';
import { UserMyPage } from '@next/ui';
import { useGetUserPrivateInfoByCookieQuery } from '@next/graphql';

const MyPage: NextPage = () => {
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
      <div>
        <UserMyPage
          userName={userName}
          description={description}
          avatar={avatar}
          image={image}
          orgs={belongOrgs}
          messages={messages}
          email={email}
          secureBases={belongSecureBases}
        />
      </div>
    );
  }
  return <p>{data.getUserByCookie.error.message}</p>;
};

export default MyPage;
