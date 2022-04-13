import { Resolvers } from "../generated/generatedTypes";

import { useGetUsersUsecase } from "@kurakichi/modules/user/usecase";
import { returnErrorToGQL } from "../../util/returnErrorToGqlClient";
import { dtoUsersToGql } from "../DTOtoGql";

const userResolver: Resolvers = {
  Query: {
    getUserByCookie: () => {},
    getUserById: () => {},
    getUsers: async () => {
      const result = await useGetUsersUsecase.execute();
      if (result.isLeft())
        return returnErrorToGQL(result.value.getErrorValue());
      const users = dtoUsersToGql(result.value.getValue());
      return {
        users,
      };
    },
    getMessagesByCookie: () => {},
    getMessagesByTreeId: () => {},
  },
  Mutation: {
    deleteUser: () => {},
    forgetPassword: () => {},
    login: () => {},
    logout: () => {},
    registerUser: () => {},
    replyMessage: () => {},
    sendMessage: () => {},
    updateUser: () => {},
  },
};

export { userResolver };
