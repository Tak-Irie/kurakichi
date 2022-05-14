import { createExpress } from './util/createExpress';
import { startApolloServer } from './util/startApolloServer';

import { schema } from './graphql';
import { redis } from './util/createRedis';

const main = async () => {
  const express = await createExpress({ redis });
  await startApolloServer({
    schema,
    express,
  });
  console.log('node_env', process.env.NODE_ENV);
  console.log('psql_url', process.env.PSQL_URL);
};

main().catch((err) => {
  console.error('err:', err);
});
