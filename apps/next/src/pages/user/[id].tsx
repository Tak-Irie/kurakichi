import { NextPage } from 'next';
import {
  useGetUserByCookieQuery,
  useGetUserByIdWithOrgQuery,
} from '../../graphql/generated/graphql';
import { useGetIdFromUrl } from '../../util';

import { LoadingStylishSpinner, UserProfile } from '@next/ui';

const User: NextPage = () => {
  const id = useGetIdFromUrl();
  const { data, error, loading } = useGetUserByIdWithOrgQuery({ variables: { userId: id } });
  const { data: clientData } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });

  if (loading) return <LoadingStylishSpinner />;

  if (error) return <p>{error.message}</p>;

  if (data.getUserByIdWithOrg.user) {
    const { userName, avatar, image, description, belongOrgs } = data.getUserByIdWithOrg.user;
    return (
      <div>
        <UserProfile
          userId={id}
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

  return <LoadingStylishSpinner />;
};

export default User;
