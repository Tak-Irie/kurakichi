import idx from 'idx';
import Link from 'next/link';
import { FC } from 'react';

import { useGetUserMyInfoQuery } from '../../../graphql';
import { FAIL_TO_FETCH } from '../../../lib/Constants';
import {
  AvatarSmall,
  ButtonBig,
  IconsUser,
  IconsUsers,
  IconsVerticalDots,
  LoadingSpinner,
} from '../../presentational/atoms';
import {
  DropDownMenu2,
  DropDownMenuItem,
} from '../../presentational/molecules';
import { LogoutMenuItem } from '../user/LogoutButton';

export const NavAuthSection: FC = () => {
  // console.log('rendered:');
  const { data, loading, error } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) return <div>{error.message}</div>;

  // if (data?.getUserByCookie.__typename === 'Errors')
  //   return (

  //   );

  if (data?.getUserByCookie.__typename === 'User') {
    const authorizedUser = data.getUserByCookie;
    const belongedOrg = idx(authorizedUser, (d) => d.orgs.edges);
    return (
      <div className="z-10">
        <DropDownMenu2
          menuElement={
            <AvatarSmall
              src={authorizedUser.avatarUrl || FAIL_TO_FETCH}
              alt="ユーザーアバター"
              notification
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
              {belongedOrg
                ? belongedOrg.map((org) => (
                    <div key={org.node.id}>
                      <DropDownMenuItem
                        linkUrl="/org/myorg/[id]"
                        linkAs={`/org/myorg/${org.node.id}`}
                        label={org.node.name}
                        icon={<IconsUsers />}
                      />
                    </div>
                  ))
                : null}
              <LogoutMenuItem />
            </>
          }
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
