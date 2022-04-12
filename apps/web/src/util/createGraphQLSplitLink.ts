import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_HTTP_LINK || "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.GRAPHQL_WS_LINK || "ws://localhost:4000/subscriptions",
    // connectionParams: {
    //   authToken: user.authToken,
    // },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export { splitLink };
