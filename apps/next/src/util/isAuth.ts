import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetUserByCookieQuery } from '../graphql/generated/graphql';

export const IsAuth = () => {
  const { data, loading } = useGetUserByCookieQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.getUserByCookie.user) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [loading, data, router]);

  return loading;
};
