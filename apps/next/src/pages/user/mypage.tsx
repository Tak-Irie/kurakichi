import { NextPage } from 'next';
import { UserProfile } from '@next/ui';

import { useMeUserQuery } from '../../graphql/generated/graphql';

const MyPage: NextPage = () => {
  const { data } = useMeUserQuery({ fetchPolicy: 'cache-only' });
  const { userName, belongOrg, picture } = data.me.user;

  return (
    <div>
      <UserProfile
        userName={userName}
        description="ここは自己紹介を記入する欄です"
        icon=""
        image={picture}
        orgs={belongOrg}
      />
    </div>
  );
};

export default MyPage;
