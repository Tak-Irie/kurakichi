import { useRouter } from 'next/router';
import { FC } from 'react';
import { useUserLogoutMutation } from '../../graphql/generated/graphql';
import { ButtonBig } from '../presentational/atoms/Buttons';

const LogoutButton: FC = () => {
  const [logout, { client }] = useUserLogoutMutation();
  const router = useRouter();

  return (
    <ButtonBig
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        await logout();
        router.replace('/');
        // TODO: need to reset all cache ?
        await client.resetStore();
      }}
    >
      Logout
    </ButtonBig>
  );
};

export { LogoutButton };
