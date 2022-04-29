import { pubsub } from '../../util/createRedis';

const DIALOG_POSTED_TOPIC = 'dialog_posted';

export const SubscriptionsResolver = {
  Subscription: {
    dialogPosted: {
      subscribe: () => pubsub.asyncIterator([DIALOG_POSTED_TOPIC]),
    },
  },
};
