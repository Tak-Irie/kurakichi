import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const createRedis = (redisUrl: string): Redis => new Redis(redisUrl);
const createRedisPubSub = (
  publisherUrl: string,
  subscriberUrl: string,
): RedisPubSub => {
  const pubsub = new RedisPubSub({
    publisher: new Redis(publisherUrl),
    subscriber: new Redis(subscriberUrl),
  });
  return pubsub;
};

export { createRedis, createRedisPubSub };
