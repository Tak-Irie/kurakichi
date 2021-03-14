import { NextPage } from 'next';
import { LogoutButton } from '../components/container/LogoutButton';
import { UserDeleteButton } from '../components/container/UserDeleteButton';
import { useUserMeQuery } from '../graphql/generated/graphql';
import { IsAuth } from '../util/isAuth';

const Private: NextPage = () => {
  IsAuth();
  const { data, loading, error } = useUserMeQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>loading</p>;

  if (error) return <p>{error.message}</p>;

  if (!loading && data)
    return (
      <>
        <p>aaa</p>
        <p>bbb</p>
        {data.me.user?.username && <p>こんにちは {data.me.user.username} !</p>}
        <LogoutButton />
        <UserDeleteButton />
      </>
    );
};

export default Private;
