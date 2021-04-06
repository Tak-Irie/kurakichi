import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../tailwind.css';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../util/createApolloClient';

import { Layout } from '../components/presentational/templates/Layouts';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300&display=swap"
          rel="stylesheet"
        />
        <title>くらきち -くらしのあんぜんきち</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default CustomApp;
