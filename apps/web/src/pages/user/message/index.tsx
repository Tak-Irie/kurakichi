import { NextPage } from 'next';

import Link from 'next/link';
import {
  ButtonWithIcon,
  IconsUser,
  LoadingSpinner,
} from '../../../components/presentational/atoms';
import { TableMessage } from '../../../components/presentational/molecules';
import { UserTemplate } from '../../../components/presentational/templates';
import { useGetMessagesByCookieQuery } from '../../../graphql';
import { isLoggedIn } from '../../../util';

const MessageBoxPage: NextPage = () => {
  const { cachedUser, loadingCache } = isLoggedIn();

  const { data, loading, error } = useGetMessagesByCookieQuery();
  // console.log('user:', userData.getUserByCookie.user);
  if (loading && loadingCache) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getMessagesByCookie?.errors?.applicationError) {
    return <p>{data.getMessagesByCookie.errors.applicationError.message}</p>;
  }
  if (!loadingCache && data?.getMessagesByCookie?.messages && cachedUser) {
    const messages = data.getMessagesByCookie.messages;
    const _messages: any[] = [];
    if (messages.length !== 0) {
      _messages.concat(messages);
    }

    return (
      <UserTemplate
        avatar={cachedUser.avatarUrl || ''}
        image={cachedUser.heroImageUrl || ''}
        userName={cachedUser.name || ''}
        headerButtons={
          <Link href="/user/mypage" passHref>
            <a href="replace">
              <ButtonWithIcon
                type="button"
                label="マイページに戻る"
                icon={<IconsUser />}
              />
            </a>
          </Link>
        }
        pageContents={
          <TableMessage
            tableLabel="メッセージボックス"
            textOfNotExist="メッセージはありません"
            messages={_messages}
          />
        }
      />
    );
  }
  return <p>wip</p>;
};

export default MessageBoxPage;
