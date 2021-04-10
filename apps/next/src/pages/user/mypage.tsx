import { NextPage } from 'next';
import { UserProfile } from '@next/ui';

import { useGetMyInfoDetailQuery } from '../../graphql/generated/graphql';

const MyPage: NextPage = () => {
  const { data, loading, error } = useGetMyInfoDetailQuery({ fetchPolicy: 'cache-and-network' });

  if (loading) return <p>loading</p>;
  if (error) return <p>{error.message}</p>;

  const { userName, belongOrgs, picture, messages, email, belongSecureBases } = data.me.user;
  console.log('MyPageData:', data.me.user);
  return (
    <div>
      <UserProfile
        userName={userName}
        description="ここは自己紹介を記入する欄です"
        icon=""
        image={picture}
        orgs={belongOrgs}
        messages={messages}
        email={email}
        secureBases={belongSecureBases}
      />
    </div>
  );
};

export default MyPage;
