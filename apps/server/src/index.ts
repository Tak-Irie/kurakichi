import { startApolloServer } from "./util/startApolloServer";
import { createExpress } from "./util/createExpress";

import { resolvers, typeDefs } from "@kurakichi/modules";

const main = async () => {
  const expressApp = await createExpress();
  await startApolloServer({
    typeDefs,
    resolvers,
    express: expressApp,
  });
};

main().catch((err) => {
  console.error("err:", err);
});
