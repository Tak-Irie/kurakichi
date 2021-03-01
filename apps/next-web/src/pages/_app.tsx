import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../tailwind.css';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';

import { Layout } from '../components/presentational/templates/Layouts';
import { NextPageContext } from 'next';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  cache: new InMemoryCache(),
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>くらしのあんぜんきち -kurakichi-</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default CustomApp;
