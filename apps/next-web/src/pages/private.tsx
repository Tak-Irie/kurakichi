import { useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SyntheticEvent } from 'react';
import { LogoutButton } from '../components/container/LogoutButton';
import { useUserMeQuery } from '../graphql/generated/graphql';
import { IsAuth } from '../util/isAuth';

const Private: NextPage = () => {
  IsAuth();
  const { data, loading, error } = useUserMeQuery();

  const apolloClient = useApolloClient();

  const router = useRouter();

  const logout = async (e: SyntheticEvent) => {
    e.preventDefault();
    await apolloClient.cache.reset();
    router.push('/');
    console.log('wip');
  };

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
