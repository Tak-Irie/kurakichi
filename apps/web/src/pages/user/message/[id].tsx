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
  if (data?.getMessagesByTreeId?.errors)
    return <p>{data.getMessagesByTreeId.errors.applicationError?.message}</p>;

  if (!loading && data?.getMessagesByTreeId?.messageTree && cachedUser) {
    const _tree = data.getMessagesByTreeId.messageTree;

    const _messages: any[] = [];
    if (_tree.leaves && _tree.leaves?.edges?.length !== 0) {
      _messages.concat(_tree.leaves?.edges?.map((arr) => arr.node || ''));
    }

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
        pageContents={<MessageTree treeId={_tree.id} messages={_messages} />}
      />
    );
  }
  return <p>wip</p>;
};

export default MessageTreePage;
