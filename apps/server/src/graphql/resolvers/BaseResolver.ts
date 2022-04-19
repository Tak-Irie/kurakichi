import { ApolloContext } from '../../types';
import { Resolvers } from '../generated/generatedTypes';

export const BaseResolver: Resolvers<ApolloContext> = {
  Query: {
    // getBase:async(_,{id},{idInCookie}) => {
    //   if(idInCookie===undefined)return returnNotLoggedIn()
    // }
    // getKarte :async() => {}
    // getDialogByBaseId:async() => {}
  },
  Mutation: {
    // createBase: async (_, __, { idInCookie }) => {
    //   if (idInCookie === undefined) return returnNotLoggedIn();
    //   const usecaseResult = await useCreateBaseUsecase.execute({
    //     adminId: idInCookie,
    //   });
    //   if (usecaseResult.isLeft())
    //     return returnErrorToGQL(usecaseResult.value.getErrorValue());
    //   const base = dtoBaseToGql(usecaseResult.value.getValue());
    //   return { base };
    // },
    // postDialog:async() => {}
  },
};
