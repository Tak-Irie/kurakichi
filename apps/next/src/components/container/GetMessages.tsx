import { FC } from 'react';
import { useGetMessagesByCookieQuery } from '../../graphql/generated/graphql';
import { LoadingSpinner, SmallCard } from '@next/ui';

export const GetMessages: FC = () => {
  const { data, loading, error, fetchMore } = useGetMessagesByCookieQuery();

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  // console.log('data:', data);
  return (
    <div>
      {!data.getMessagesByCookie.messages ? (
        <p>no massage</p>
      ) : (
        <ul>
          {data.getMessagesByCookie.messages.map((message) => {
            return <SmallCard key={message.id} title={message.id} content={message.content} />;
          })}
        </ul>
      )}
      <button onClick={() => fetchMore}>fetchMoreMess</button>
    </div>
  );
};
