import { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloProvider } from '@apollo/client';
import '../../globals.css';

import { Layout } from '../components/presentational/templates';
import { apolloClient } from '../util/createApolloClient';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>くらきち~くらしのあんぜんきち~</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default CustomApp;
