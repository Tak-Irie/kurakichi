import { useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SyntheticEvent } from 'react';
import { useUserMeQuery } from '../graphql/generated/graphql';
import { IsAuth } from '../util/isAuth';

const Private: NextPage = () => {
  IsAuth();
  const { data, loading } = useUserMeQuery();

  const apolloClient = useApolloClient();

  const router = useRouter();

  const logout = async (e: SyntheticEvent) => {
    // e.preventDefault();
    // await apolloClient.cache.reset();
    // router.push('/');
    console.log('wip');
  };

  if (loading) return <p>loading</p>;

  if (!loading && data)
    return (
      <>
        <p>aaa</p>
        <p>bbb</p>
        <button
          type="button"
          onClick={(e) => logout}
          className="my-3 bg-red-300"
        >
          ログアウト
        </button>
      </>
    );
};

export default Private;
