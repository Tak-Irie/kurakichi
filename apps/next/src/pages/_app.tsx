import React, { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import 'tailwindcss/tailwind.css';

import { AuthContext } from '../util';
import { apolloClient } from '../util/createApolloClient';
import { Layout } from '@next/ui';

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
      <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default CustomApp;
