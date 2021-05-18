import { NextPage } from 'next';
import Link from 'next/link';

import { useGetMessagesByTreeIdQuery, useGetUserByCookieQuery } from '@next/graphql';
import {
  LoadingSpinner,
  MessageTree,
  UserTemplate,
  ButtonWithIcon,
  IconsUser,
  IconsMail,
} from '@next/ui';
import { useRouter } from 'next/router';

const MessageTreePage: NextPage = () => {
  const router = useRouter();
  const messageTreeId = router.query.id as string;

  const { data: uData } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });
  const { data, loading, error } = useGetMessagesByTreeIdQuery({
    variables: { treeId: messageTreeId },
  });

  // console.log('user:', userData.getUserByCookie.user);
  if (loading) return <LoadingSpinner />;
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
            <Link href="/user/mypage" passHref>
              <a href="replace">
                <ButtonWithIcon type="button" label="マイページに戻る" icon={<IconsUser />} />
              </a>
            </Link>
            <Link href="/user/message" passHref scroll={false}>
              <a href="replace">
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
