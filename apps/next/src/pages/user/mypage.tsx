import { NextPage } from 'next';
import { UserMyPage } from '@next/ui';

import { useGetUserDetailByCookieQuery } from '../../graphql/generated/graphql';

const MyPage: NextPage = () => {
  const { data, loading, error } = useGetUserDetailByCookieQuery();

  if (loading) return <p>loading</p>;
  if (error) return <p>{error.message}</p>;

  if (data) {
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
};

export default MyPage;
