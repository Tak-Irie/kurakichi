import { useRouter } from 'next/router';
import { FC } from 'react';
import { useLogoutUserMutation } from '../../../graphql';

import { ButtonBig, IconsLogout } from '../../presentational/atoms';
import { DropDownMenuItemButton } from '../../presentational/molecules';

export const LogoutButton: FC = () => {
  const router = useRouter();

  const [logout, { client }] = useLogoutUserMutation();

  return (
    <ButtonBig
      label="ログアウト"
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        await logout();
        await client.resetStore();
        router.replace('/');
      }}
    />
  );
};

export const LogoutMenuItem: FC = () => {
  const router = useRouter();
  const [logout, { client }] = useLogoutUserMutation();

  return (
    <DropDownMenuItemButton
      label="ログアウト"
      icon={<IconsLogout />}
      onClick={async () => {
        await logout();
        await client.resetStore();
        router.replace('/');
      }}
    />
  );
};
