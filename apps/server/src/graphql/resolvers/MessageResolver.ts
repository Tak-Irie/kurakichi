import {
  useGetMessagesByTreeIdUsecase,
  useGetMessagesUsecase,
  useReplyMessageUsecase,
  useSendMessageUsecase,
} from '@kurakichi/modules/user/usecase';
import { ApolloContext } from '../../types';
import {
  returnErrorToGQL,
  returnNotLoggedIn,
} from '../../util/FunctionsForGqlResolver';
import {
  dtoMessagesToGql,
  dtoMessagesToTree,
  dtoMessageToGql,
} from '../DTOtoGql';
import { Resolvers } from '../generated/generatedTypes';

export const MessageResolver: Resolvers<ApolloContext> = {
  Query: {
    getMessagesByCookie: async (_, __, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const usecaseResult = await useGetMessagesUsecase.execute({
        userId: idInCookie,
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      const messages = dtoMessagesToGql(usecaseResult.value.getValue());

      return { messages };
    },
    getMessagesByTreeId: async (
      _,
      { input: { treeId, userId } },
      { idInCookie },
    ) => {
      if (idInCookie === undefined)
        return returnErrorToGQL('ログインが確認できませんでした');
      const usecaseResult = await useGetMessagesByTreeIdUsecase.execute({
        treeId: treeId,
        requestUserId: idInCookie,
      });
      if (usecaseResult.isLeft()) {
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      }
      const messageTree = dtoMessagesToTree({
        treeId: treeId,
        messages: usecaseResult.value.getValue(),
      });
      return { messageTree };
    },
  },
  Mutation: {
    sendMessage: async (
      _,
      { input: { content, receiverId } },
      { idInCookie },
    ) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const usecaseResult = await useSendMessageUsecase.execute({
        senderId: idInCookie,
        receiverId: receiverId,
        textInput: content,
      });

      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const message = dtoMessageToGql(usecaseResult.value.getValue());
      return { message };
    },
    replyMessage: async (
      _,
      { input: { content, replyTargetId } },
      { idInCookie },
    ) => {
      if (idInCookie) return returnNotLoggedIn();
      const usecaseResult = await useReplyMessageUsecase.execute({
        replyTargetId,
        content,
      });

      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const message = dtoMessageToGql(usecaseResult.value.getValue());
      return { message };
    },
  },
};
