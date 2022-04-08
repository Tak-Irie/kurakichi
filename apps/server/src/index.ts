import "dotenv/config";
import { startApolloServer } from "./util/startApolloServer";
import { createExpress } from "./util/createExpress";

import { redis } from "./util/createRedis";
import { schema } from "./graphql";

const main = async () => {
  const express = await createExpress({ redis });
  await startApolloServer({
    schema,
    express,
  });
};

main().catch((err) => {
  console.error("err:", err);
});
