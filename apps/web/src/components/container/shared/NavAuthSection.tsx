import idx from 'idx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { useGetUserMyInfoQuery, useLogoutUserMutation } from '../../../graphql';
import { FAIL_TO_FETCH } from '../../../lib/Constants';
import {
  AvatarSmall,
  ButtonBig,
  IconsLogout,
  IconsUser,
  IconsUsers,
  IconsVerticalDots,
  LoadingSpinner,
} from '../../presentational/atoms';
import { DropDownMenu } from '../../presentational/molecules';

export const NavAuthSection: FC = () => {
  // console.log('rendered:');
  const { data, loading, error } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-first',
  });
  const router = useRouter();
  const [logout, { client }] = useLogoutUserMutation();

  const items = [
    {
      itemLabel: 'マイページ',
      icon: <IconsUser />,
      url: '/user/mypage',
    },
    {
      itemLabel: 'ログアウト',
      icon: <IconsLogout />,
      onClick: async () => {
        await logout();
        await client.resetStore();
        router.replace('/');
      },
    },
  ];

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) return <div>{error.message}</div>;

  if (data?.getUserByCookie.__typename === 'User') {
    const authorizedUser = data.getUserByCookie;
    const belongedOrg = idx(authorizedUser, (d) => d.orgs.edges);

    if (belongedOrg) {
      belongedOrg.forEach((org) => {
        items.push({
          itemLabel: org.node.name,
          icon: <IconsUsers />,
          url: `/org/myorg/${org.node.id}`,
        });
      });
    }

    return (
      <div className="z-10 w-full">
        <DropDownMenu
          menuElement={
            <div className="inline-flex justify-end items-center">
              <AvatarSmall
                src={authorizedUser.avatarUrl || FAIL_TO_FETCH}
                alt="ユーザーアバター"
                notification
              />
              <IconsVerticalDots />
            </div>
          }
          items={items}
        />
      </div>
    );
  }
  return (
    <div className="flex absolute space-x-1">
      <Link href="/auth/user-register" passHref>
        <a href="replace">
          <ButtonBig color="yellow" type="button" label="新規登録" />
        </a>
      </Link>
      <Link href="/auth/login" passHref>
        <a href="replace">
          <ButtonBig color="yellow" type="button" label="ログイン" />
        </a>
      </Link>
    </div>
  );
};
