import {
  getMessagesByCookie,
  useGetMessagesByTreeIdUsecase,
  useReplyMessageUsecase,
  useSendMessageUsecase,
} from '@kurakichi/domain';
import { ApolloContext } from '../../@types/global';
import {
  returnErrorToGQL,
  returnNotLoggedIn,
} from '../../util/FunctionsForGqlResolver';
import {
  dtoMessagesToTree,
  dtoMessageToGql,
  readMessagesToGql,
} from '../DTOtoGql';
import { Resolvers } from '../generated/generatedTypes';

export const MessageResolver: Resolvers<ApolloContext> = {
  Query: {
    getMessagesByCookie: async (_, __, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      // const usecaseResult = await useGetMessagesUsecase.execute({
      //   userId: idInCookie,
      // });
      // if (usecaseResult.isLeft())
      //   return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const result = await getMessagesByCookie(idInCookie);
      console.log('getMessagesByCookie res:', result);
      if (result === false) return returnErrorToGQL('wip');

      const messages = readMessagesToGql(result);

      return { __typename: 'Messages', messages };
    },
    getMessagesByTreeId: async (_, { treeId }, { idInCookie }) => {
      console.log('getMessagesByTreeId:', treeId);
      if (idInCookie === undefined)
        return returnErrorToGQL('ログインが確認できませんでした');
      const usecaseResult = await useGetMessagesByTreeIdUsecase.execute({
        treeId,
        requestUserId: idInCookie,
      });
      if (usecaseResult.isLeft()) {
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      }
      const messageTree = dtoMessagesToTree({
        treeId,
        messages: usecaseResult.value.getValue(),
      });
      return { __typename: 'MessageTree', ...messageTree };
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
        receiverId,
        contentInput: content,
      });

      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const message = dtoMessageToGql(usecaseResult.value.getValue());
      return { __typename: 'Message', ...message };
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
      return { __typename: 'Message', ...message };
    },
  },
};
