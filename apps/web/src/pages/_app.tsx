import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';

import { ApolloProvider } from '@apollo/client';
import '../../globals.css';

import { Layout } from '../components/presentational/templates';
import { AuthContext } from '../util';
import { apolloClient } from '../util/createApolloClient';

function CustomApp({ Component, pageProps }: AppProps) {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
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
