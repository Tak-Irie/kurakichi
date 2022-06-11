import { HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_HTTP_LINK ||
    'http://localhost:4000/graphql',
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  //  @ts-ignore
  typeof window !== 'undefined'
    ? createClient({
        url:
          process.env.NEXT_PUBLIC_GRAPHQL_WS_LINK ||
          'ws://localhost:4000/graphql',
      })
    : null,
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export { splitLink };
