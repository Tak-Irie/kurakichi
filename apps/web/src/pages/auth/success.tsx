import { NextPage } from 'next';
import { useGetUserByCookieQuery } from '../../graphql/generated/graphql';

const AuthSuccess: NextPage = () => {
  const { data, loading, error } = useGetUserByCookieQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>読込中です</p>;

  if (error) return <p>{error.message}</p>;

  if (data.getUserByCookie.error) return <p>{data.getUserByCookie.error.message}</p>;
  // console.log('data:', data);
  return (
    <>
      <p>認証に成功しました！</p>
      <p>こんにちは！ {data.getUserByCookie.user.userName}</p>
    </>
  );
};

export default AuthSuccess;
