import { NextPage } from 'next';

import Link from 'next/link';
import {
  ButtonWithIcon,
  IconsUser,
  LoadingSpinner,
} from '../../../components/presentational/atoms';
import { TableMessage } from '../../../components/presentational/organisms';
import { UserTemplate } from '../../../components/presentational/templates';
import { useGetMessagesByCookieQuery } from '../../../graphql';
import { useUserStatus } from '../../../lib';

const MessageBoxPage: NextPage = () => {
  const { cachedUser, loadingCache } = useUserStatus();

  const { data, loading, error } = useGetMessagesByCookieQuery({ ssr: false });
  // console.log('user:', userData.getUserByCookie.user);
  if (loading && loadingCache) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getMessagesByCookie?.__typename === 'Errors') {
    return <p>{data.getMessagesByCookie.applicationError?.message}</p>;
  }
  if (
    cachedUser?.__typename === 'User' &&
    data?.getMessagesByCookie?.__typename === 'Messages'
  ) {
    const { messages } = data.getMessagesByCookie;

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
            messages={messages || []}
          />
        }
      />
    );
  }
  return <p>wip</p>;
};

export default MessageBoxPage;
