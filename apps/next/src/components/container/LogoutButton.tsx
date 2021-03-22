import { useRouter } from 'next/router';
import { FC } from 'react';
import { useUserLogoutMutation } from '../../graphql/generated/graphql';
import { MiddleButton } from '../presentational/atoms/Button';

const LogoutButton: FC = () => {
  const [logout, { client }] = useUserLogoutMutation();
  const router = useRouter();

  return (
    <MiddleButton
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        await logout();
        // TODO: need to reset all cache ?
        await client.resetStore();
        router.push('/');
      }}
    >
      Logout
    </MiddleButton>
  );
};

export { LogoutButton };
