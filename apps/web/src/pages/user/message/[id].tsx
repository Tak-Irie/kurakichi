import idx from 'idx';
import { NextPage } from 'next';
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
import { useGetMessagesByTreeIdQuery } from '../../../graphql';
import { isLoggedIn } from '../../../util';

const MessageTreePage: NextPage = () => {
  const router = useRouter();
  const messageTreeId = router.query.id as string;

  const { cachedUser, loadingCache } = isLoggedIn();

  const { data, loading, error } = useGetMessagesByTreeIdQuery({
    variables: { treeId: messageTreeId },
    ssr: false,
  });

  // console.log('user:', userData.getUserByCookie.user);
  if (loadingCache || loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;
  if (data?.getMessagesByTreeId?.__typename === 'Errors')
    return <p>{data.getMessagesByTreeId.applicationError?.message}</p>;

  if (
    cachedUser?.__typename === 'User' &&
    data?.getMessagesByTreeId?.__typename === 'MessageTree'
  ) {
    const _tree = data.getMessagesByTreeId;
    const messages = idx(_tree, (idx) => idx.leaves.edges);

    return (
      <UserTemplate
        avatar={cachedUser.avatarUrl || ''}
        image={cachedUser.heroImageUrl || ''}
        userName={cachedUser.name || ''}
        headerButtons={
          <>
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
          </>
        }
        pageContents={
          <MessageTree
            treeId={_tree.id}
            messages={messages?.map((_) => _.node) || []}
          />
        }
      />
    );
  }
  return <p>wip</p>;
};

export default MessageTreePage;
