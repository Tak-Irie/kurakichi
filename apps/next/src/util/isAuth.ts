import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserMeQuery } from '../graphql/generated/graphql';

export const IsAuth = () => {
  const { data, loading } = useUserMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.me.user) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [loading, data, router]);

  return loading;
};
