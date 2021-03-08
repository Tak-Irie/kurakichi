import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useUserLogoutMutation } from '../../graphql/generated/graphql';
import { MiddleButton } from '../presentational/atoms/Button';

type LogoutButtonProps = {
  some?: string;
};

const LogoutButton: FC<LogoutButtonProps> = () => {
  const [logout, { client }] = useUserLogoutMutation();
  const router = useRouter();

  return (
    <MiddleButton
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        await logout();
        await client.resetStore();
        router.push('/');
      }}
    >
      Logout
    </MiddleButton>
  );
};

export { LogoutButton };
