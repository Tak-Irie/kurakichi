import { FC } from 'react';
import Link from 'next/link';

import { isServer } from '../../../util/isServer';
import { useGetUserByCookieQuery } from '@next/graphql';
import {
  LoadingSpinner,
  ButtonBig,
  AvatarSmall,
  IconsVerticalDots,
  IconsUser,
  IconsUsers,
  DropDownMenu,
  DropDownMenuItem,
} from '@next/ui';
import { LogoutMenuItem } from '@next/container';

const NavAuthSection: FC = () => {
  const { data, loading } = useGetUserByCookieQuery({
    skip: isServer(),
    fetchPolicy: 'cache-first',
  });

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  if (!data?.getUserByCookie.user)
    return (
      <div className="flex space-x-1">
        <Link href="/auth/register" passHref>
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

  return (
    <div className="z-10">
      <DropDownMenu
        menuElement={
          <AvatarSmall
            src={data.getUserByCookie.user.avatar}
            alt="ユーザーアバター"
            notification={true}
          />
        }
        menuIcon={<IconsVerticalDots />}
      >
        <DropDownMenuItem linkUrl="/user/mypage" label="マイページ" icon={<IconsUser />} />
        {data.getUserByCookie.user.belongOrgs[0]
          ? data.getUserByCookie.user.belongOrgs.map((org) => {
              return (
                <div key={org.id}>
                  <DropDownMenuItem
                    linkUrl="/org/myorg/[id]"
                    linkAs={`/org/myorg/${org.id}`}
                    label={org.orgName}
                    icon={<IconsUsers />}
                  />
                </div>
              );
            })
          : null}
        <LogoutMenuItem />
      </DropDownMenu>
    </div>
  );
};

export { NavAuthSection };
