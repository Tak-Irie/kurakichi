import { FC } from 'react';
import { useRouter } from 'next/router';

import { ButtonBig, DropDownMenuItemButton, IconsLogout } from '@next/ui';
import { useUserLogoutMutation } from '../../graphql/generated/graphql';

export const LogoutButton: FC = () => {
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

export const LogoutMenuItem: FC = () => {
  const [logout, { client }] = useUserLogoutMutation();
  const router = useRouter();

  return (
    <DropDownMenuItemButton
      label="ログアウト"
      icon={<IconsLogout />}
      onClick={async () => {
        await logout();
        router.replace('/');
        // TODO: need to reset all cache ?
        await client.resetStore();
      }}
    />
  );
};
