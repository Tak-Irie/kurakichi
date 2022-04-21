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

  const res = data?.getUserById;
  if (res?.__typename === 'Errors') {
    <p>{res.applicationError?.message}</p>;
  }
  if (res?.__typename === 'User') {
    return (
      <div>
        <UserProfile
          userId={uid}
          avatar={res?.avatarUrl || ''}
          description={res?.selfIntro || ''}
          image={res?.heroImageUrl || ''}
          userName={res?.name || ''}
          // orgs={belongOrgs}
          // loggedIn={!!clientData?.getUserByCookie.user}
        />
      </div>
    );
  }
  return <p>wip, something wrong</p>;
};

export default UserProfilePage;
