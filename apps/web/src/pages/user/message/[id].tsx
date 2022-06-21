import idx from 'idx';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  ButtonWithIcon,
  IconsMail,
  IconsUser,
  LoadingSpinner,
} from '../../../components/presentational/atoms';
import {
  MessageTree,
  UserTemplate,
} from '../../../components/presentational/templates';
import {
  useGetMessagesByTreeIdQuery,
  useGetUserMyInfoQuery,
} from '../../../graphql';

const MessageTreePage: NextPage = () => {
  const router = useRouter();
  const messageTreeId = router.query.id as string;
  // const { cachedUser, loadingCache } = useUserStatus();
  const { data: cachedUser, loading: loadingCache } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-only',
  });

  const { data, loading } = useGetMessagesByTreeIdQuery({
    variables: { treeId: messageTreeId },
  });

  // console.log('user:', userData.getUserByCookie.user);
  if (loadingCache || loading) return <LoadingSpinner />;
  // if (error) return <p>{error.message}</p>;
  console.log('messageData:', data);
  // if (data?.getMessagesByTreeId?.__typename === 'Errors')
  //   return <p>{data.getMessagesByTreeId.applicationError?.message}</p>;

  if (
    cachedUser?.getUserByCookie.__typename === 'User' &&
    data?.getMessagesByTreeId?.__typename === 'MessageTree'
  ) {
    const userData = cachedUser.getUserByCookie;
    const fetchedTree = data.getMessagesByTreeId;
    console.log('message/[id]:', fetchedTree);
    const messages = idx(fetchedTree, (accessor) => accessor.leaves.edges);

    return (
      <UserTemplate
        avatar={userData.avatarUrl || ''}
        image={userData.heroImageUrl || ''}
        userName={userData.name || ''}
        headerButtons={
          <div>
            <Link href="/user/mypage" passHref>
              <a href="replace">
                <ButtonWithIcon
                  type="button"
                  label="マイページに戻る"
                  icon={<IconsUser />}
                />
              </a>
            </Link>
            <Link href="/user/message" passHref scroll={false}>
              <a href="replace">
                <ButtonWithIcon
                  type="button"
                  label="メッセージボックス"
                  icon={<IconsMail />}
                />
              </a>
            </Link>
          </div>
        }
        pageContents={
          <MessageTree messages={messages?.map((_) => _.node) || []} />
        }
      />
    );
  }

  if (
    cachedUser?.getUserByCookie.__typename === 'User' &&
    data?.getMessagesByTreeId?.__typename === 'Errors'
  ) {
    const userData = cachedUser.getUserByCookie;

    return (
      <UserTemplate
        avatar={userData.avatarUrl || ''}
        image={userData.heroImageUrl || ''}
        userName={userData.name || ''}
        headerButtons={
          <div>
            <Link href="/user/mypage" passHref>
              <a href="replace">
                <ButtonWithIcon
                  type="button"
                  label="マイページに戻る"
                  icon={<IconsUser />}
                />
              </a>
            </Link>
            <Link href="/user/message" passHref scroll={false}>
              <a href="replace">
                <ButtonWithIcon
                  type="button"
                  label="メッセージボックス"
                  icon={<IconsMail />}
                />
              </a>
            </Link>
          </div>
        }
        pageContents={
          <p>{data.getMessagesByTreeId.applicationError?.message}</p>
        }
      />
    );
  }
  return <div>something wrong</div>;
};
export default MessageTreePage;
