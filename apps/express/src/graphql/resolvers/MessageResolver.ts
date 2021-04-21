import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';

import { useGetMessagesUseCase, useSendMessageUseCase } from '@kurakichi/domain';
import { dtoMessagesToGql, dtoMessageToGql } from '../DTOtoGql';
import { returnErrorToGQL } from '../../util/returnErrorToGQL';

export const MessageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getMessages', {
      type: 'MessagePayload',
      description: "get User's id, then show their own messages",
      resolve: async (_, __, context) => {
        // console.log('queryConfirm:');
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const domainResponse = await useGetMessagesUseCase.execute({ userId: idOrErr });
        if (domainResponse.isLeft()) return returnErrorToGQL(domainResponse);

        const domainMessages = domainResponse.value.getValue();
        const gqlField = dtoMessagesToGql(domainMessages);

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
        messageStatus: 'MessageStatus',
      },
      resolve: async (_, args, context) => {
        // console.log('arg:', args);
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const domainResponse = await useSendMessageUseCase.execute({
          senderId: idOrErr,
          receiverId: args.receiverId,
          textInput: args.textInput,
          status: args.messageStatus,
        });

        if (domainResponse.isLeft()) return returnErrorToGQL(domainResponse);

        const gqlField = dtoMessageToGql(domainResponse.value.getValue());
        return { message: gqlField };
      },
    });
  },
});
