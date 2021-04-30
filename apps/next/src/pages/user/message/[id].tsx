import { NextPage } from 'next';

import { useGetMessagesByTreeIdQuery, useGetUserByCookieQuery } from '@next/graphql';
import { LoadingStylishSpinner, MessageTree } from '@next/ui';
import { useGetIdFromUrl } from '../../..//util';

const MessageTreePage: NextPage = () => {
  const id = useGetIdFromUrl();
  const { data: userData } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });
  const { data, loading, error } = useGetMessagesByTreeIdQuery({
    variables: { treeId: id },
  });

  // console.log('user:', userData.getUserByCookie.user);
  if (loading) return <LoadingStylishSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data.getMessagesByTreeId.error) {
    return <p>{data.getMessagesByTreeId.error.message}</p>;
  }
  if (!loading && data.getMessagesByTreeId.messageTree && userData.getUserByCookie.user)
    return (
      <MessageTree
        avatar={userData.getUserByCookie.user.avatar}
        image={userData.getUserByCookie.user.image}
        userName={userData.getUserByCookie.user.userName}
        messages={data.getMessagesByTreeId.messageTree.treedMessage}
      />
    );
};

export default MessageTreePage;
