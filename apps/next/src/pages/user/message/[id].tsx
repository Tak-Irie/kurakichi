import { NextPage } from 'next';

import {
  useGetMessageTreeQuery,
  useGetUserByCookieQuery,
  useResponseMessageMutation,
} from '@next/graphql';
import { LoadingStylishSpinner, MessageTree } from '@next/ui';
import { useGetIdFromUrl } from '../../..//util';

const MessageTreePage: NextPage = () => {
  const id = useGetIdFromUrl();
  const { data, loading, error } = useGetMessageTreeQuery({
    variables: { messageId: id },
  });
  const { data: userData } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });

  if (loading) return <LoadingStylishSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data.getMessageTreeByMessageId.messageTree.messagesWithTree) {
    return (
      <MessageTree
        avatar={userData.getUserByCookie.user.avatar}
        image={userData.getUserByCookie.user.image}
        userName={userData.getUserByCookie.user.userName}
        messages={data.getMessageTreeByMessageId.messageTree.messagesWithTree}
      />
    );
  }

  return <p>{data.getMessageTreeByMessageId.error.message}</p>;
};

export default MessageTreePage;
