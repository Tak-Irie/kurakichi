import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';

import { useGetMessagesUseCase, useSendMessageUseCase } from '@kurakichi/domain';
import { messageToPresentation } from '../toPresentationDTO/messageToPresentation';

export const MessageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getMessages', {
      type: 'MessagePayload',
      description: "get User's id, then show their own messages",
      resolve: async (_, __, context) => {
        // console.log('queryConfirm:');
        const idResponse = getUserIdByCookie(context);
        if (idResponse.result == false) return { error: { message: idResponse.errMessage } };

        const domainResponse = await useGetMessagesUseCase.execute({ userId: idResponse.id });
        if (domainResponse.isLeft())
          return { error: { message: domainResponse.value.getErrorValue() } };

        const messages = domainResponse.value.getValue();
        const gqlField = messages.map((message) => messageToPresentation(message));

        return { messages: gqlField };
      },
    });
  },
});

export const MessageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('sendMessage', {
      type: 'MessagePayload',
      args: {
        textInput: nonNull(stringArg()),
        receiverId: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        // console.log('arg:', args);
        const idResponse = getUserIdByCookie(context);
        if (idResponse.result == false) return { error: { message: idResponse.errMessage } };
        const domainResponse = await useSendMessageUseCase.execute({
          senderId: idResponse.id,
          receiverId: args.receiverId,
          textInput: args.textInput,
        });

        if (domainResponse.isLeft())
          return { error: { message: domainResponse.value.getErrorValue() } };

        const gqlField = messageToPresentation(domainResponse.value.getValue());
        return { message: gqlField };
      },
    });
  },
});
