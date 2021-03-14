import Redis from 'ioredis';

const redis = new Redis(process.env.NX_REDIS_URL);

export { redis };
