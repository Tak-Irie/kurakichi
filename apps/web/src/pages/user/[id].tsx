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

  if (data?.getUserById.__typename === 'Errors') {
    <p>{data.getUserById.applicationError?.message}</p>;
  }

  return (
    <div>
      {data?.getUserById.__typename === 'User' ? (
        <div>
          <UserProfile
            avatar={data.getUserById.avatarUrl || ''}
            description={data.getUserById.selfIntro || ''}
            image={data.getUserById.heroImageUrl || ''}
            userName={data.getUserById.name || ''}
            orgs={data.getUserById.orgs?.edges?.map((org) => org.node) || []}
          />
        </div>
      ) : (
        <div>sorry, something wrong</div>
      )}
    </div>
  );
};

export default UserProfilePage;
