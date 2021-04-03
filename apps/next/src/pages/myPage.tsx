import { NextPage } from 'next';
import { UserDeleteButton } from '../components/container/UserDeleteButton';
import { useMeUserQuery } from '../graphql/generated/graphql';
import { IsAuth } from '../util/isAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UserChangePassword } from '../components/container/UserChangePassword';
import { GetMessages } from '../components/container/GetMessages';

const MyPage: NextPage = () => {
  // IsAuth();
  const { data, loading, error } = useMeUserQuery({
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
        {data.me.user && <p>こんにちは {data.me.user.userName} !</p>}
        <GetMessages />
        <UserChangePassword />
        <UserDeleteButton />
      </>
    );
};

export default MyPage;
