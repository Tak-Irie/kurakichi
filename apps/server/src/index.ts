import { createExpress } from './util/createExpress';
import { startApolloServer } from './util/startApolloServer';

import { schema } from './graphql';
import { createRedis } from './util/createRedis';

const main = async () => {
  const redisUrl = process.env.REDIS_URL || 'redis://0.0.0.0:6379';
  const redis = createRedis(redisUrl);
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
