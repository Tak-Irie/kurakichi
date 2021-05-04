import { NextPage } from 'next';

import {
  ButtonWithIcon,
  IconsUser,
  LoadingStylishSpinner,
  TableMessage,
  UserTemplate,
} from '@next/ui';
import {
  useGetUserByCookieQuery,
  useGetMessagesByTreeIdQuery,
  useGetMessagesByCookieQuery,
} from '@next/graphql';
import React from 'react';
import Link from 'next/link';

const MessagePage: NextPage = () => {
  const { data: userData } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });
  const { data, loading, error } = useGetMessagesByCookieQuery();

  // console.log('user:', userData.getUserByCookie.user);
  if (loading) return <LoadingStylishSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data.getMessagesByCookie.error) {
    return <p>{data.getMessagesByCookie.error.message}</p>;
  }
  if (!loading && data.getMessagesByCookie.messages && userData.getUserByCookie.user)
    return (
      <UserTemplate
        avatar={userData.getUserByCookie.user.avatar}
        image={userData.getUserByCookie.user.image}
        userName={userData.getUserByCookie.user.userName}
        headerButtons={
          <Link href="/user/mypage">
            <a href="/user/mypage">
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
};

export default MessagePage;
