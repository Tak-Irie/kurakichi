import { NextPage } from 'next';
import Link from 'next/link';

import { useGetMessagesByTreeIdQuery, useGetUserByCookieQuery } from '@next/graphql';
import {
  LoadingStylishSpinner,
  MessageTree,
  UserTemplate,
  ButtonWithIcon,
  IconsUser,
  IconsMail,
} from '@next/ui';
import { useGetIdFromUrl } from '../../..//util';

const MessageTreePage: NextPage = () => {
  const ids = useGetIdFromUrl();
  const { data: uData } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });
  const { data, loading, error } = useGetMessagesByTreeIdQuery({
    variables: { treeId: ids.mestid },
  });

  // console.log('user:', userData.getUserByCookie.user);
  if (loading) return <LoadingStylishSpinner />;
  if (error) return <p>{error.message}</p>;

  const mesData = data.getMessagesByTreeId;
  const usrData = uData.getUserByCookie;

  if (mesData.error) {
    return <p>{mesData.error.message}</p>;
  }
  if (!loading && mesData.messageTree && usrData.user)
    return (
      <UserTemplate
        avatar={usrData.user.avatar}
        image={usrData.user.image}
        userName={usrData.user.userName}
        headerButtons={
          <>
            <Link href="/user/mypage">
              <a href="/user/mypage">
                <ButtonWithIcon type="button" label="マイページに戻る" icon={<IconsUser />} />
              </a>
            </Link>
            <Link href="/user/message" scroll={false}>
              <a href="/user/message">
                <ButtonWithIcon type="button" label="メッセージボックス" icon={<IconsMail />} />
              </a>
            </Link>
          </>
        }
        pageContents={<MessageTree messages={mesData.messageTree.treedMessage} />}
      />
    );
};

export default MessageTreePage;
