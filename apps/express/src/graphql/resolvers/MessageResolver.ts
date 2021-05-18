import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';

import {
  useGetMessagesUseCase,
  useGetMessagesByTreeIdUseCase,
  useGetUsersByIdsUseCase,
  useReplyMessageUseCase,
  useSendMessageUseCase,
} from '@kurakichi/domain';
import { dtoMessagesWithSenderToGql, dtoMessageToGql } from '../DTOtoGql';
import { returnErrorToGQL } from '../../util/returnErrorToGQL';

export const MessageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getMessagesByCookie', {
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
          ids: domainMessages.map((message) => message.senderId),
        });
        if (domainResponse2.isLeft()) return returnErrorToGQL(domainResponse2);
        const domainUsers = domainResponse2.value.getValue();

        const gqlMessages = dtoMessagesWithSenderToGql(domainMessages, domainUsers);

        return { messages: gqlMessages };
      },
    });
    t.field('getMessagesByTreeId', {
      type: 'MessagePayload',
      args: {
        treeId: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        // console.log('queryConfirm:');
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const domainMessagesOrErr = await useGetMessagesByTreeIdUseCase.execute({
          treeId: args.treeId,
          requestUserId: idOrErr,
        });
        if (domainMessagesOrErr.isLeft()) return returnErrorToGQL(domainMessagesOrErr);

        const dtoMessages = domainMessagesOrErr.value.getValue();
        const domainUsersOrErr = await useGetUsersByIdsUseCase.execute({
          ids: dtoMessages.map((message) => message.senderId),
        });
        if (domainUsersOrErr.isLeft()) return returnErrorToGQL(domainUsersOrErr);

        const dtoUsers = domainUsersOrErr.value.getValue();
        const gqlMessages = dtoMessagesWithSenderToGql(dtoMessages, dtoUsers);

        return { messageTree: { id: gqlMessages[0].tree.id, treedMessage: gqlMessages } };
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
    t.field('replyMessage', {
      type: 'MessagePayload',
      args: {
        content: nonNull(stringArg()),
        replyTargetId: nonNull(stringArg()),
      },
      resolve: async (_, args) => {
        const domainResponse = await useReplyMessageUseCase.execute({
          replyTargetId: args.replyTargetId,
          content: args.content,
        });

        if (domainResponse.isLeft()) return returnErrorToGQL(domainResponse);

        const gqlField = dtoMessageToGql(domainResponse.value.getValue());
        return { message: gqlField };
      },
    });
  },
});
