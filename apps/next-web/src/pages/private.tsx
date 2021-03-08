import { NextPage } from 'next';
import { LogoutButton } from '../components/container/LogoutButton';
import { useUserMeQuery } from '../graphql/generated/graphql';
import { IsAuth } from '../util/isAuth';

const Private: NextPage = () => {
  IsAuth();
  const { data, loading, error } = useUserMeQuery();

  if (loading) return <p>loading</p>;

  if (error) return <p>{error.message}</p>;

  if (!loading && data)
    return (
      <>
        <p>aaa</p>
        <p>bbb</p>
        <LogoutButton />
      </>
    );
};

export default Private;
