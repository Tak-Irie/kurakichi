import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';

import {
  useGetMessagesUseCase,
  useGetMessageTreeUseCase,
  useGetUsersByIdsUseCase,
  useResponseMessageUseCase,
  useSendMessageUseCase,
} from '@kurakichi/domain';
import { dtoMessagesWithSenderToGql, dtoMessageToGql } from '../DTOtoGql';
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

        const domainResponse2 = await useGetUsersByIdsUseCase.execute({
          ids: domainMessages.map((message) => message.sender),
        });
        if (domainResponse2.isLeft()) return returnErrorToGQL(domainResponse2);
        const domainUsers = domainResponse2.value.getValue();

        const gqlMessages = dtoMessagesWithSenderToGql(domainMessages, domainUsers);

        return { messages: gqlMessages };
      },
    });
    t.field('getMessageTreeByMessageId', {
      type: 'MessagePayload',
      args: {
        messageId: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        // console.log('queryConfirm:');
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const domainResponse = await useGetMessageTreeUseCase.execute({
          messageId: args.messageId,
          requestUserId: idOrErr,
        });
        if (domainResponse.isLeft()) return returnErrorToGQL(domainResponse);

        const domainMessages = domainResponse.value.getValue();
        const domainResponse2 = await useGetUsersByIdsUseCase.execute({
          ids: domainMessages.map((message) => message.sender),
        });
        if (domainResponse2.isLeft()) return returnErrorToGQL(domainResponse2);
        const domainUsers = domainResponse2.value.getValue();

        const gqlMessages = dtoMessagesWithSenderToGql(domainMessages, domainUsers);

        return { messageTree: { id: domainMessages[0].treeId, messagesWithTree: gqlMessages } };
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
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const domainResponse = await useSendMessageUseCase.execute({
          senderId: idOrErr,
          receiverId: args.receiverId,
          textInput: args.textInput,
        });

        if (domainResponse.isLeft()) return returnErrorToGQL(domainResponse);

        const gqlField = dtoMessageToGql(domainResponse.value.getValue());
        return { message: gqlField };
      },
    });
    t.field('responseMessage', {
      type: 'MessagePayload',
      args: {
        text: nonNull(stringArg()),
        originalMessageId: nonNull(stringArg()),
      },
      resolve: async (_, args) => {
        const domainResponse = await useResponseMessageUseCase.execute({
          originalMessageId: args.originalMessageId,
          text: args.text,
        });

        if (domainResponse.isLeft()) return returnErrorToGQL(domainResponse);

        const gqlField = dtoMessageToGql(domainResponse.value.getValue());
        return { message: gqlField };
      },
    });
  },
});
