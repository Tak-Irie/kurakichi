import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import 'tailwindcss/tailwind.css';

import { apolloClient } from '../util/createApolloClient';
import { Layout } from '@next/ui';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300&display=swap"
          rel="stylesheet"
        />
        <title>くらきち~くらしのあんぜんきち~</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default CustomApp;
