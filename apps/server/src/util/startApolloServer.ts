import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import type Express from "express";
import {
  APOLLO_SERVER_PORT,
  APOLLO_STUDIO,
  CORS_WEB,
  GRAPHQL_PATH,
  LOCAL_WEB,
} from "./Constants";
import { makeExecutableSchema } from "@graphql-tools/schema";

type ApolloSeverProps = {
  typeDefs: any;
  resolvers: any;
  express: Express.Application;
};

const startApolloServer = async ({
  typeDefs,
  resolvers,
  express,
}: ApolloSeverProps) => {
  const httpServer = http.createServer(express);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: GRAPHQL_PATH,
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema,
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
