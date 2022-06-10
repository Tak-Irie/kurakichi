import { useRouter } from 'next/router';
import { useLogoutUserMutation } from '../graphql';

export const useLogout = async () => {
  const router = useRouter();
  const [logout, { client }] = useLogoutUserMutation();

  await logout();
  await client.resetStore();
  router.replace('/');
};
