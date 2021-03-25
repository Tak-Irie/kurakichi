import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../tailwind.css';

import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';

import { Layout } from '../components/presentational/templates/Layouts';
import { splitLink } from '../util/createApolloLink';

const client = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',
  link: splitLink,
  credentials: 'include',
  cache: new InMemoryCache(),
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300&display=swap"
          rel="stylesheet"
        />
        <title>くらしのあんぜんきち -kurakichi-</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default CustomApp;
