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
    serverPort: process.env.SERVER_PORT || '4000',
    corsWeb: process.env.CORS_WEB || 'http://localhost:3000',
    redisPubUrl: redisUrl,
    redisSubUrl: redisUrl,
  });
  console.log('node_env', process.env.NODE_ENV);
  console.log('psql_url', process.env.PSQL_URL);
  console.log('redis_url', process.env.REDIS_URL);
  console.log('redis', redisUrl);
};

main().catch((err) => {
  console.error('err:', err);
});
