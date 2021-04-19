import { FC, useState } from 'react';
import Link from 'next/link';

import { useMeQuery } from '../../../graphql/generated/graphql';
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
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  if (loading)
    return (
      <div>
        <LoadingStylishSpinner />
      </div>
    );

  if (!data?.me.user)
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
        menuElement={<AvatarSmall notification={false} />}
        menuIcon={<IconsVerticalDots />}
      >
        <DropDownMenuItem linkUrl="/user/mypage" label="マイページ" icon={<IconsUser />} />
      </DropDownMenu>
    </div>
  );
};

export { NavAuthSection };
