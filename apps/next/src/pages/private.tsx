import { NextPage } from 'next';
import { LogoutButton } from '../components/container/LogoutButton';
import { UserDeleteButton } from '../components/container/UserDeleteButton';
import { useUserMeQuery } from '../graphql/generated/graphql';
import { IsAuth } from '../util/isAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UserChangePassword } from '../components/container/UserChangePassword';

const Private: NextPage = () => {
  // IsAuth();
  const { data, loading, error } = useUserMeQuery({
    fetchPolicy: 'network-only',
  });
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me.user) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [loading, data, router]);

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
        <UserChangePassword />
      </>
    );
};

export default Private;
