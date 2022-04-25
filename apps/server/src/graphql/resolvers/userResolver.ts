import { Resolvers } from '../generated/generatedTypes';

import {
  getUserMyInfo,
  useDeleteUserUsecase,
  useForgotPasswordUsecase,
  useGetUserById,
  useGetUsersUsecase,
  useLoginUserUsecase,
  useLogoutUserUsecase,
  useRegisterUserUsecase,
  useUpdateUserUsecase,
} from '@kurakichi/domain';
import { ApolloContext } from '../../types';
import { COOKIE_NAME } from '../../util/Constants';
import { returnErrorToGQL } from '../../util/FunctionsForGqlResolver';
import { dtoUsersToGql, dtoUserToGql, readUserToGql } from '../DTOtoGql';

const UserResolver: Resolvers<ApolloContext> = {
  Query: {
    getUserByCookie: async (_, __, { idInCookie }) => {
      if (idInCookie === undefined)
        return returnErrorToGQL('ログインが確認できませんでした');

      // FIXME:CQRS
      // const usecaseResult = await useGetUserById.execute({ id: idInCookie });
      // console.log('me/usecaseResult:', usecaseResult);
      // if (usecaseResult.isLeft())
      //   return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const res = await getUserMyInfo(idInCookie);
      if (res === false) return returnErrorToGQL('wip');

      return readUserToGql(res);
    },

    getUserById: async (_, { userId }) => {
      const usecaseResult = await useGetUserById.execute({ id: userId });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      return dtoUserToGql(usecaseResult.value.getValue());
    },
    getUsers: async () => {
      const result = await useGetUsersUsecase.execute();
      if (result.isLeft())
        return returnErrorToGQL(result.value.getErrorValue());
      const users = dtoUsersToGql(result.value.getValue());
      return {
        __typename: 'Users',
        users,
      };
    },
  },
  Mutation: {
    registerUser: async (_, { input }, context) => {
      const usecaseResult = await useRegisterUserUsecase.execute({
        ...input,
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      const dtoUser = usecaseResult.value.getValue();
      // console.log('stoUser:', dtoUser);
      context.req.session.userId = dtoUser.id;
      // console.log('session:', context.req.session.userId);
      return dtoUserToGql(dtoUser);
    },
    loginUser: async (_, { input }, context) => {
      // console.log('arg:', args);
      const useCaseResult = await useLoginUserUsecase.execute({ ...input });
      if (useCaseResult.isLeft())
        return returnErrorToGQL(useCaseResult.value.getErrorValue());
      const gqlUser = dtoUserToGql(useCaseResult.value.getValue());
      context.req.session.userId = gqlUser.id;
      // console.log('gqluser:', gqlUser);
      return { ...gqlUser };
    },
    logoutUser: async (_, __, { idInCookie, req, res }) => {
      if (idInCookie === undefined)
        return {
          result: false,
          ...returnErrorToGQL('ログインしていません'),
        };
      const useCaseResult = await useLogoutUserUsecase.execute({
        userId: idInCookie,
      });
      if (useCaseResult.isLeft())
        return returnErrorToGQL(useCaseResult.value.getErrorValue());

      // TODO::transplant this process to auth service
      req.session.destroy((err) => {
        console.log('err:', err);
      });
      res.clearCookie(COOKIE_NAME);
      return { succeeded: 'ログアウトしました' };
    },
    deleteUser: async (_, __, { idInCookie, req, res }) => {
      // TODO:set up logger sentry or winston
      if (idInCookie === undefined)
        return { result: false, ...returnErrorToGQL('ログインしていません') };
      const result = await useDeleteUserUsecase.execute({ userId: idInCookie });
      if (result.isLeft()) {
        req.session.destroy((err) => {
          console.log('err:', err);
        });
        return returnErrorToGQL(result.value.getErrorValue());
      }

      res.clearCookie(COOKIE_NAME);
      return {
        succeeded: 'アカウントの削除に成功しました',
      };
    },
    forgetPassword: async (_, { email }) => {
      const result = await useForgotPasswordUsecase.execute(email);
      if (result.isLeft())
        return returnErrorToGQL(result.value.getErrorValue());
      return { succeeded: 'パスワード再登録メールを送信しました' };
    },
    updateUser: async (_, { input }, { idInCookie }) => {
      if (idInCookie === undefined) {
        return returnErrorToGQL('ログインしていません');
      }
      const { name, email, selfIntro, avatarUrl, heroImageUrl } = input;
      const useCaseResult = await useUpdateUserUsecase.execute({
        userId: idInCookie,
        userName: name || '',
        email: email || '',
        avatar: avatarUrl || '',
        description: selfIntro || '',
        image: heroImageUrl || '',
      });

      if (useCaseResult.isLeft())
        return returnErrorToGQL(useCaseResult.value.getErrorValue());

      const dtoUser = useCaseResult.value.getValue();
      return dtoUserToGql(dtoUser);
    },
    // replyMessage:async () => {},
    // sendMessage: async() => {},

    // FIXME:メーラーの実装を待ってから
    // changePassword: async () => {},
  },
};

export { UserResolver };
