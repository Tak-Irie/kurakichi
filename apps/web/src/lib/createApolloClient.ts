import { ApolloClient, InMemoryCache } from '@apollo/client';

import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { splitLink } from './createGraphQLSplitLink';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<any>;

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    name: 'kurakichi',
    version: '0.0.1',
    link: splitLink,
    credentials: 'include',
    cache: new InMemoryCache(),
  });

export function initializeApollo(initialState = null) {
  const client = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = client.extract();
    const data = merge(existingCache, initialState, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });
    client.cache.restore(data);
  }
  if (typeof window === 'undefined') return client;
  if (!apolloClient) apolloClient = client;

  return client;
}

export function addApolloState(client: ApolloClient<any>, pageProps: any) {
  if (pageProps?.props) {
    // eslint-disable-next-line no-param-reassign
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
