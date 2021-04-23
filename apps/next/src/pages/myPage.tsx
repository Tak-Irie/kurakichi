import { NextPage } from 'next';
import { UserDeleteButton } from '../components/container/UserDeleteButton';
import { useGetUserByCookieQuery } from '../graphql/generated/graphql';
import { IsAuth } from '../util/isAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ChangeUserPassword } from '../components/container/ChangeUserPassword';
import { GetMessages } from '../components/container/GetMessages';

const MyPage: NextPage = () => {
  // IsAuth();
  const { data, loading, error } = useGetUserByCookieQuery({
    fetchPolicy: 'network-only',
  });

  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.getUserByCookie.user) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [loading, data, router]);

  if (loading) return <p>loading</p>;

  if (error) return <p>{error.message}</p>;

  if (!loading && data)
    return (
      <>
        {data.getUserByCookie.user && <p>こんにちは {data.getUserByCookie.user.userName} !</p>}
        <GetMessages />
        <ChangeUserPassword />
        <UserDeleteButton />
      </>
    );
};

export default MyPage;
