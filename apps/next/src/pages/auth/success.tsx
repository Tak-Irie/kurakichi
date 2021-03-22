import { NextPage } from 'next';
import { useUserMeQuery } from '../../graphql/generated/graphql';

const AuthSuccess: NextPage = () => {
  const { data, loading, error } = useUserMeQuery();

  if (loading) return <p>読込中です</p>;

  if (!data && error) return <p>{error.message}</p>;

  return (
    <>
      <p>認証に成功しました！</p>
      <p>こんにちは！ {data.me.user.username}</p>
    </>
  );
};

export default AuthSuccess;
