import idx from 'idx';
import Link from 'next/link';
import { FC } from 'react';

import { useGetUserMyInfoQuery } from '../../../graphql';
import { isServer } from '../../../util';
import { FAIL_TO_FETCH } from '../../../util/Constants';
import { LogoutMenuItem } from '../../container';
import {
  AvatarSmall,
  ButtonBig,
  IconsUser,
  IconsUsers,
  IconsVerticalDots,
  LoadingSpinner,
} from '../atoms';
import { DropDownMenu2, DropDownMenuItem } from '../molecules';

const NavAuthSection: FC = () => {
  const { data, loading, error } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-only',
    ssr: false,
    skip: isServer(),
  });

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  if (error) return <div>{error.message}</div>;

  if (!data)
    return (
      <div className="flex absolute space-x-1">
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

  if (data?.getUserByCookie?.__typename === 'User') {
    const _user = data.getUserByCookie;
    const _org = idx(_user, (d) => d.orgs.edges);
    return (
      <div className="z-10">
        <DropDownMenu2
          menuElement={
            <AvatarSmall
              src={_user.avatarUrl || FAIL_TO_FETCH}
              alt="ユーザーアバター"
              notification={true}
            />
          }
          menuIcon={<IconsVerticalDots />}
          menuItems={
            <>
              <DropDownMenuItem
                linkUrl="/user/mypage"
                label="マイページ"
                icon={<IconsUser />}
              />
              {_org
                ? _org.map((org) => {
                    return (
                      <div key={org.node.id}>
                        <DropDownMenuItem
                          linkUrl="/org/myorg/[id]"
                          linkAs={`/org/myorg/${org.node.id}`}
                          label={org.node.name}
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
  }
  return <p>wip, something wrong</p>;
};

export { NavAuthSection };
