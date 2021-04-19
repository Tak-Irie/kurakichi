import { NextPage } from 'next';
import { useGetUserQuery } from '../../graphql/generated/graphql';
import { useGetIdFromUrl } from '../../util';

import { LoadingStylishSpinner, UserProfile } from '@next/ui';

const User: NextPage = () => {
  const id = useGetIdFromUrl();
  const { data, error, loading } = useGetUserQuery({ variables: { userId: id } });

  if (loading) return <LoadingStylishSpinner />;

  if (error) return <p>{error.message}</p>;

  if (data.getUser.user) {
    const { userName, avatar, image, description, belongOrgs } = data.getUser.user;
    return (
      <div>
        <UserProfile
          userId={id}
          avatar={avatar}
          description={description}
          image={image}
          userName={userName}
          orgs={belongOrgs}
        />
      </div>
    );
  }
};

export default User;
