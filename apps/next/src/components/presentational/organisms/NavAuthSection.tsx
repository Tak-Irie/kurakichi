import { FC, useState } from 'react';
import Link from 'next/link';

import { useGetUserByCookieQuery } from '../../../graphql/generated/graphql';
import { isServer } from '../../../util/isServer';
import {
  LoadingStylishSpinner,
  ButtonSmall,
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
  });

  if (loading)
    return (
      <div>
        <LoadingStylishSpinner />
      </div>
    );

  if (!data?.getUserByCookie.user)
    return (
      <div>
        <Link href="/login" passHref>
          <a href="replace">
            <ButtonSmall type="button">ログイン</ButtonSmall>
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
