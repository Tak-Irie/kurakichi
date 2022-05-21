import { HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_HTTP_LINK ||
    'http://localhost:4000/graphql',
});

const wsLink = new GraphQLWsLink(
  //@ts-ignore
  typeof window !== 'undefined'
    ? createClient({
        url:
          process.env.NEXT_PUBLIC_GRAPHQL_WS_LINK ||
          'ws://localhost:4000/graphql',
      })
    : null,
);

const uploadLink = createUploadLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_HTTP_LINK ||
    'http://localhost:4000/graphql',
});

// TODO:add client error handling
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//       ),
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

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
