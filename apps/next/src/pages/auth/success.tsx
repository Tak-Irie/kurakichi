import { NextPage } from 'next';
import { useMeUserQuery } from '../../graphql/generated/graphql';

const AuthSuccess: NextPage = () => {
  const { data, loading, error } = useMeUserQuery();

  if (loading) return <p>読込中です</p>;

  if (!data && error) return <p>{error.message}</p>;

  return (
    <>
      <p>認証に成功しました！</p>
      <p>こんにちは！ {data.me.user.userName}</p>
    </>
  );
};

export default AuthSuccess;
