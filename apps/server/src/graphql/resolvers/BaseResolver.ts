import { ApolloContext } from '../../types';
import { Resolvers } from '../generated/generatedTypes';

const DIALOG_POSTED_TOPIC = 'dialog_posted';

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
    postDialog: async (_, { input: { content } }, { idInCookie }) => {
      console.log('cache:', { content, idInCookie });
      const mock = { id: '123', content: 'hoge' };
      return { ...mock };
    },
  },
  Subscription: {
    dialogPosted: {
      subscribe: (_, __, { pubsub }) => {
        console.log('pubsub:', pubsub);
        return pubsub.asyncIterator(DIALOG_POSTED_TOPIC) as any;
      },
    },
  },
};
