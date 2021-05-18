import { ApolloClient, InMemoryCache } from '@apollo/client';
import { splitApolloLink } from './createApolloLink';

export const apolloClient = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',
  ssrMode: typeof window === 'undefined',
  link: splitApolloLink,
  credentials: 'include',
  cache: new InMemoryCache({
    // typePolicies: {
    //   User: {
    //     fields: {
    //       messages: {
    //         merge(existing = [], incoming: any[]) {
    //           return [...existing, ...incoming];
    //         },
    //       },
    //     },
    //   },
    //   MessageTree: {
    //     fields: {
    //       treedMessage: {
    //         merge(existing = [], incoming: any[]) {
    //           return [...existing, ...incoming];
    //         },
    //       },
    //     },
    //   },
    // },
  }),
});
