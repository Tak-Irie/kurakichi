import { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloProvider } from '@apollo/client';
import '../../styles/globals.css';

import { MapLoader } from '../components/container/shared/GoogleMap/MapLoader';
import { Layout } from '../components/presentational/templates';
import { useApollo } from '../lib/createApolloClient';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>くらきち~くらしのあんぜんきち~</title>
      </Head>
      <Layout>
        <MapLoader>
          <Component {...pageProps} />
        </MapLoader>
      </Layout>
    </ApolloProvider>
  );
};

export default CustomApp;
