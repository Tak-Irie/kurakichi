import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LoadingSpinner } from '../../components/presentational/atoms';
import { UserProfile } from '../../components/presentational/templates';
import { useGetUserPublicInfoQuery } from '../../graphql';

const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const uid = router.query.id as string;
  const { data, error, loading } = useGetUserPublicInfoQuery({
    variables: { userId: uid },
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;
  if (data?.getUserById?.errors?.applicationError) {
    <p>{data.getUserById.errors.applicationError.message}</p>;
  }
  if (data?.getUserById?.user) {
    const _user = data.getUserById.user;
    return (
      <div>
        <UserProfile
          userId={uid}
          avatar={_user?.avatarUrl || ''}
          description={_user?.selfIntro || ''}
          image={_user?.heroImageUrl || ''}
          userName={_user?.name || ''}
          // orgs={belongOrgs}
          // loggedIn={!!clientData?.getUserByCookie.user}
        />
      </div>
    );
  }
  return <p>wip</p>;
};

export default UserProfilePage;
