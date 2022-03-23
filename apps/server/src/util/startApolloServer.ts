import { ApolloServer, Config } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import type Express from "express";

type ApolloSeverProps = {
  typeDefs: any;
  resolvers: any;
  express: Express.Application;
};

const startApolloServer = async (props: ApolloSeverProps) => {
  const { express, resolvers, typeDefs } = props;
  const port = 4000;

  const httpServer = http.createServer(express);
  const a = new ApolloServer({
    typeDefs,
  });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app: express,
    path: "/graphql",
  });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`http ready:${port}`);
  console.log(`gql ready:${port}${server.graphqlPath}`);
};

export { startApolloServer };
