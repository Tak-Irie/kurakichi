import { ApolloClient, InMemoryCache } from '@apollo/client';
import { splitApolloLink } from './createApolloLink';

export const apolloClient = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',
  ssrMode: typeof window === 'undefined',
  link: splitApolloLink,
  credentials: 'include',
  cache: new InMemoryCache(),
});
