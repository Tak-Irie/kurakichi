import { FC } from 'react';
import { useGetMessagesQuery } from '../../graphql/generated/graphql';
import { LoadingStylishSpinner, SmallCard } from '@next/ui';

export const GetMessages: FC = () => {
  const { data, loading, error, fetchMore } = useGetMessagesQuery();

  if (loading) return <LoadingStylishSpinner />;
  if (error) return <p>{error.message}</p>;

  console.log('data:', data);
  return (
    <div>
      {!data.getMessages.messages ? (
        <p>no massage</p>
      ) : (
        <ul>
          {data.getMessages.messages.map((message) => {
            return <SmallCard key={message.id} title={message.id} content={message.content} />;
          })}
        </ul>
      )}
      <button onClick={() => fetchMore}>fetchMoreMess</button>
    </div>
  );
};
