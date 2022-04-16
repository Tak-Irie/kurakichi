import { NextPage } from 'next';

import Link from 'next/link';
import {
  ButtonWithIcon,
  IconsUser,
  LoadingSpinner,
} from '../../../components/presentational/atoms';
import { TableMessage } from '../../../components/presentational/molecules';
import { UserTemplate } from '../../../components/presentational/templates';
import { useGetUserMyInfoQuery } from '../../../graphql';

const Message: NextPage = () => {
  const { data, loading, error } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-first',
  });

  // console.log('user:', userData.getUserByCookie.user);
  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data.getMessagesByCookie.error) {
    return <p>{data.getMessagesByCookie.error.message}</p>;
  }
  if (
    !loading &&
    data.getMessagesByCookie.messages &&
    userData.getUserByCookie.user
  ) {
    const _user = userData.getUserByCookie.user;
    return (
      <UserTemplate
        avatar={_user.avatar}
        image={_user.image}
        userName={_user.userName}
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
            messages={data.getMessagesByCookie.messages}
          />
        }
      />
    );
  }
};

export default Message;
