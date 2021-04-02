import { extendType, nonNull, stringArg } from 'nexus';
import { Dialog, Event } from '../sourceTypes';

const DialogSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field('dialogPosted', {
      type: 'Dialog',
      subscribe: (_, __, context) => context.pubsub.asyncIterator('post'),
      resolve: async (eventPromise: Promise<Event<Dialog>>) => {
        const event = await eventPromise;
        return event.data;
      },
    });
  },
});

const DialogMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('postDialog', {
      type: 'DialogPayload',
      args: {
        id: nonNull(stringArg()),
        dialogContent: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        await context.pubsub.publish('post', {
          data: { id: args.id, dialogContent: args.dialogContent },
        });
        return { dialog: [{ id: args.id, dialogContent: args.dialogContent }] };
      },
    });
  },
});

export { DialogMutation, DialogSubscription };
