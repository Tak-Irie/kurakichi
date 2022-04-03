import { startApolloServer } from "./util/startApolloServer";
import { createExpress } from "./util/createExpress";

import { resolvers, typeDefs } from "@kurakichi/modules";
import { redis } from "./util/createRedis";

const main = async () => {
  const express = await createExpress({ redis });
  await startApolloServer({
    typeDefs,
    resolvers,
    express,
  });
};

main().catch((err) => {
  console.error("err:", err);
});
