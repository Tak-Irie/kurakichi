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
  DropDownMenu,
  DropDownMenuItem,
} from '@next/ui';

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
        <Link href="/login">
          <a href="/login">
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
      </DropDownMenu>
    </div>
  );
};

export { NavAuthSection };
