import { FC, useContext, useEffect } from 'react';
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
  DropDownMenu2,
  DropDownMenuItem,
} from '@next/ui';
import { LogoutMenuItem } from '@next/container';
import { AuthContext } from '../../../util';

const NavAuthSection: FC = () => {
  const { authStatus } = useContext(AuthContext);
  const { data, loading, refetch } = useGetUserByCookieQuery({
    skip: isServer(),
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    refetch();
  }, [authStatus, refetch]);

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  if (!loading && !data?.getUserByCookie.user)
    return (
      <div className="flex space-x-1 absolute">
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
      <DropDownMenu2
        menuElement={
          <AvatarSmall
            src={data.getUserByCookie.user.avatar}
            alt="ユーザーアバター"
            notification={true}
          />
        }
        menuIcon={<IconsVerticalDots />}
        menuItems={
          <>
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
          </>
        }
      />
    </div>
  );
};

export { NavAuthSection };
