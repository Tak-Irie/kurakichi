import Redis from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6380";

const redis = new Redis(redisUrl);

const pubRedis = new Redis(redisUrl);
const subRedis = new Redis(redisUrl);

const pubsub = new RedisPubSub({
  publisher: pubRedis,
  subscriber: subRedis,
});

export { redis, pubsub };
