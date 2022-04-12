import { NextPage } from 'next';
import {
  useGetUserByCookieQuery,
  useGetUserByIdWithOrgQuery,
} from '../../graphql/generated/graphql';
import { useGetIdFromUrl } from '../../util';

import { LoadingSpinner, UserProfile } from '@next/ui';
import { useRouter } from 'next/router';

const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const uid = router.query.id as string;
  const { data, error, loading } = useGetUserByIdWithOrgQuery({ variables: { userId: uid } });
  const { data: clientData } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });

  if (loading) return <LoadingSpinner />;

  if (error) return <p>{error.message}</p>;

  if (data.getUserByIdWithOrg.user) {
    const { userName, avatar, image, description, belongOrgs } = data.getUserByIdWithOrg.user;
    return (
      <div>
        <UserProfile
          userId={uid}
          avatar={avatar}
          description={description}
          image={image}
          userName={userName}
          orgs={belongOrgs}
          loggedIn={!!clientData?.getUserByCookie.user}
        />
      </div>
    );
  }

  return <LoadingSpinner />;
};

export default UserProfilePage;
