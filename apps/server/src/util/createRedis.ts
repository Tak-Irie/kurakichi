import Redis from "ioredis";
// import { RedisPubSub } from "graphql-redis-subscriptions";

const uri = process.env.REDIS_URI || "redis_store:6379";
const redisUri = `redis://${uri}`;

const redis = new Redis(redisUri);

// const pubRedis = new Redis(redisUrl);
// const subRedis = new Redis(redisUrl);

// const pubsub = new RedisPubSub({
//   publisher: pubRedis,
//   subscriber: subRedis,
// });

// export { redis, pubsub };

export { redis };
