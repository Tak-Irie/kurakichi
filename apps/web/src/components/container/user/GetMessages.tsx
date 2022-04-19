import { FC } from 'react';
import { useGetMessagesByCookieQuery } from '../../../graphql';
import { FAIL_TO_FETCH } from '../../../util/Constants';
import { LoadingSpinner, SmallCard } from '../../presentational/atoms';

export const GetMessages: FC = () => {
  const { data, loading, error, fetchMore } = useGetMessagesByCookieQuery();

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  // console.log('data:', data);
  return (
    <div>
      {data?.getMessagesByCookie?.messages ? (
        <p>no massage</p>
      ) : (
        <ul>
          {data?.getMessagesByCookie?.messages?.map((message) => {
            return (
              <SmallCard
                key={message?.id || FAIL_TO_FETCH}
                title={message?.id}
                content={message?.content || FAIL_TO_FETCH}
              />
            );
          })}
        </ul>
      )}
      <button onClick={() => fetchMore}>fetchMoreMess</button>
    </div>
  );
};
