import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetUserMyInfoQuery } from '../graphql';

export const useUserStatus = () => {
  const { data, loading, error } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-only',
  });
  const router = useRouter();
  useEffect(() => {
    if (
      (!loading && data?.getUserByCookie?.__typename === 'Errors') ||
      (!loading && data?.getUserByCookie === null) ||
      error
    ) {
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [loading, data, router]);

  return { cachedUser: data?.getUserByCookie, loadingCache: loading };
};
