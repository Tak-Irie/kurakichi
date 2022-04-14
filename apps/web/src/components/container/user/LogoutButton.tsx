import { useRouter } from 'next/router';
import { FC, useContext } from 'react';

import { useUserLogoutMutation } from '../../../graphql/generated/graphql';
import { AuthContext } from '../../../util';
import { ButtonBig, IconsLogout } from '../../presentational/atoms';
import { DropDownMenuItemButton } from '../../presentational/molecules';

export const LogoutButton: FC = () => {
  const router = useRouter();
  const { setAuthStatus } = useContext(AuthContext);

  const [logout, { client }] = useUserLogoutMutation();

  return (
    <ButtonBig
      label="ログアウト"
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        await logout();
        await client.resetStore();
        setAuthStatus(false);
        router.replace('/');
      }}
    />
  );
};

export const LogoutMenuItem: FC = () => {
  const router = useRouter();
  const { setAuthStatus } = useContext(AuthContext);
  const [logout, { client }] = useUserLogoutMutation();

  return (
    <DropDownMenuItemButton
      label="ログアウト"
      icon={<IconsLogout />}
      onClick={async () => {
        await logout();
        await client.resetStore();
        setAuthStatus(false);
        router.replace('/');
      }}
    />
  );
};
