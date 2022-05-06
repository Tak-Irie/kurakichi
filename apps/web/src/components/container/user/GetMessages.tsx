import { FC } from 'react';
import { useGetMessagesByCookieQuery } from '../../../graphql';
import { FAIL_TO_FETCH } from '../../../lib/Constants';
import { LoadingSpinner, SmallCard } from '../../presentational/atoms';

export const GetMessages: FC = () => {
  const { data, loading, error, fetchMore } = useGetMessagesByCookieQuery();

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;
  if (data?.getMessagesByCookie?.__typename === 'Errors') {
    return <p>{data.getMessagesByCookie.applicationError?.message}</p>;
  }

  if (data?.getMessagesByCookie?.__typename === 'Messages') {
    const _messages = data.getMessagesByCookie.messages;
    return (
      <div>
        {_messages && _messages.length > 0 ? (
          <ul>
            {_messages.map((message) => {
              return (
                <SmallCard
                  key={message.id}
                  title={message.id}
                  content={message.content || FAIL_TO_FETCH}
                />
              );
            })}
          </ul>
        ) : (
          <p>no massage</p>
        )}
        <button onClick={() => fetchMore}>fetchMoreMessages</button>
      </div>
    );
  }
  return <p>wip</p>;
};
