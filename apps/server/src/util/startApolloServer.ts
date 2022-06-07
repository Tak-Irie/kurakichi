import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import type Express from 'express';
import { GraphQLSchema } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import { WebSocketServer } from 'ws';
import { APOLLO_STUDIO } from './Constants';
import { createRedisPubSub } from './createRedis';

import { getUserIdByCookie } from './getUserIdByCookie';

type ApolloSeverProps = {
  schema: GraphQLSchema;
  express: Express.Application;
  serverPort: string;
  corsWeb: string;
  redisPubUrl: string;
  redisSubUrl: string;
};

const startApolloServer = async ({
  schema,
  express,
  corsWeb,
  serverPort,
  redisPubUrl,
  redisSubUrl,
}: ApolloSeverProps) => {
  const httpServer = http.createServer(express);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, wsServer);
  const redisPubSub = createRedisPubSub(redisPubUrl, redisSubUrl);

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      const idOrUndefined = getUserIdByCookie({ req, res });
      return { idInCookie: idOrUndefined, req, res, pubsub: redisPubSub };
    },
    csrfPrevention: true,
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
    path: '/graphql',
    cors: {
      origin: [corsWeb, APOLLO_STUDIO],
      credentials: true,
    },
  });

  httpServer.listen(serverPort, () => {
    console.log(`http ready:${serverPort}`);
    console.log(`gql ready:${serverPort}${apolloServer.graphqlPath}`);
  });
};

export { startApolloServer };
