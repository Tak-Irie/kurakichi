import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import type Express from 'express';
import { GraphQLSchema } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import { WebSocketServer } from 'ws';
import {
  APOLLO_SERVER_PORT,
  APOLLO_STUDIO,
  CORS_WEB,
  GRAPHQL_PATH,
  LOCAL_WEB,
} from './Constants';

import { getUserIdByCookie } from './getUserIdByCookie';

type ApolloSeverProps = {
  schema: GraphQLSchema;
  express: Express.Application;
};

const startApolloServer = async ({ schema, express }: ApolloSeverProps) => {
  const httpServer = http.createServer(express);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: GRAPHQL_PATH,
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      const idOrUndefined = getUserIdByCookie({ req, res });
      return { idInCookie: idOrUndefined };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: express,
    path: GRAPHQL_PATH,
    cors: {
      origin: [CORS_WEB || LOCAL_WEB, APOLLO_STUDIO],
      credentials: true,
    },
  });

  const port = APOLLO_SERVER_PORT;

  httpServer.listen(port, () => {
    console.log(`http ready:${port}`);
    console.log(`gql ready:${port}${apolloServer.graphqlPath}`);
  });
};

export { startApolloServer };
