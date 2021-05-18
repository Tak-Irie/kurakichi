import { NextPage } from 'next';

import { ButtonWithIcon, IconsUser, LoadingSpinner, TableMessage, UserTemplate } from '@next/ui';
import { useGetUserByCookieQuery, useGetMessagesByCookieQuery } from '@next/graphql';
import React from 'react';
import Link from 'next/link';

const MessageBoxPrivatePage: NextPage = () => {
  const { data: userData } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });
  const { data, loading, error } = useGetMessagesByCookieQuery();

  // console.log('user:', userData.getUserByCookie.user);
  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data.getMessagesByCookie.error) {
    return <p>{data.getMessagesByCookie.error.message}</p>;
  }
  if (!loading && data.getMessagesByCookie.messages && userData.getUserByCookie.user) {
    const _user = userData.getUserByCookie.user;
    return (
      <UserTemplate
        avatar={_user.avatar}
        image={_user.image}
        userName={_user.userName}
        headerButtons={
          <Link href="/user/mypage" passHref>
            <a href="replace">
              <ButtonWithIcon type="button" label="マイページに戻る" icon={<IconsUser />} />
            </a>
          </Link>
        }
        pageContents={
          <TableMessage
            tableLabel="メッセージボックス"
            textOfNotExist="メッセージはありません"
            messages={data.getMessagesByCookie.messages}
          />
        }
      />
    );
  }
};

export default MessageBoxPrivatePage;
