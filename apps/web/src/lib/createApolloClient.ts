import { ApolloClient, InMemoryCache } from '@apollo/client';

import { splitLink } from './createGraphQLSplitLink';

export const apolloClient = new ApolloClient({
  ssrMode: true,
  name: 'kurakichi',
  version: '0.0.1',
  link: splitLink,
  credentials: 'include',
  cache: new InMemoryCache(),
});
