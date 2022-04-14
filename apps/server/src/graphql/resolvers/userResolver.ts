import { Resolvers } from '../generated/generatedTypes';

import {
  useGetMessagesUsecase,
  useGetUserById,
  useGetUsersUsecase,
} from '@kurakichi/modules/user/usecase';
import { ApolloContext } from '../../types';
import { returnErrorToGQL } from '../../util/returnErrorToGqlClient';
import { dtoMessagesToGql, dtoUsersToGql, dtoUserToGql } from '../DTOtoGql';

const userResolver: Resolvers<ApolloContext> = {
  Query: {
    getUserByCookie: async (_, __, { idInCookie }) => {
      if (idInCookie === undefined)
        return returnErrorToGQL('ログインが確認できませんでした');

      const usecaseResult = await useGetUserById.execute({ id: idInCookie });
      // console.log('me/useCaseResult:', useCaseResult);
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      const user = dtoUserToGql(usecaseResult.value.getValue());

      return { user };
    },

    getUserById: async (_, { userId }) => {
      const usecaseResult = await useGetUserById.execute({ id: userId });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const user = dtoUserToGql(usecaseResult.value.getValue());
      return { user };
    },
    getUsers: async () => {
      const result = await useGetUsersUsecase.execute();
      if (result.isLeft())
        return returnErrorToGQL(result.value.getErrorValue());
      const users = dtoUsersToGql(result.value.getValue());
      return {
        users,
      };
    },
    getMessagesByCookie: async (_, __, { idInCookie }) => {
      if (idInCookie === undefined)
        return returnErrorToGQL('ログインが確認できませんでした');

      const usecaseResult = await useGetMessagesUsecase.execute({
        userId: idInCookie,
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      const messages = dtoMessagesToGql(usecaseResult.value.getValue());
      return { messages };
    },
    // getMessagesByTreeId: async (_, { id }, { idInCookie }) => {
    //   if (idInCookie === undefined)
    //     return returnErrorToGQL('ログインが確認できませんでした');
    //   const usecaseResult = await useGetMessagesByTreeIdUsecase.execute({
    //     treeId: id,
    //     requestUserId: idInCookie,
    //   });
    //   if (usecaseResult.isLeft())
    //     return returnErrorToGQL(usecaseResult.value.getErrorValue());
    //   const messages = dtoMessagesToGql(usecaseResult.value.getValue());
    //   return { messageTree: { id, leaves: messages } };
    // },
  },
  Mutation: {
    // deleteUser: () => {},
    // forgetPassword: () => {},
    // login: () => {},
    // logout: () => {},
    // registerUser: () => {},
    // replyMessage: () => {},
    // sendMessage: () => {},
    // updateUser: () => {},
  },
};

export { userResolver };
