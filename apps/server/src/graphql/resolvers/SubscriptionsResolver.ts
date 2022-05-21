import { createRedisPubSub } from '../../util/createRedis';

const DIALOG_POSTED_TOPIC = 'dialog_posted';

export const SubscriptionsResolver = {
  Subscription: {
    dialogPosted: {
      subscribe: () => {
        const redisUrl = process.env.REDIS_URL || 'redis://0.0.0.0:6379';
        const pubsub = createRedisPubSub(redisUrl, redisUrl);
        return pubsub.asyncIterator([DIALOG_POSTED_TOPIC]);
      },
    },
  },
};
