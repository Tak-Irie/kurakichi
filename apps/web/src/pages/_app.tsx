import { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import "../../globals.css";

import { AuthContext } from "..";
import { apolloClient } from "../util/createApolloClient";
import { Layout } from "../components/presentational/templates";

function CustomApp({ Component, pageProps }: AppProps) {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300&display=swap'
          rel='stylesheet'
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
