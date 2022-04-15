import { Resolvers } from '../generated/generatedTypes';

import {
  useDeleteUserUsecase,
  useForgotPasswordUsecase,
  useGetUserById,
  useGetUsersUsecase,
  useLoginUserUsecase,
  useLogoutUserUsecase,
  useRegisterUserUsecase,
  useUpdateUserUsecase,
} from '@kurakichi/modules/user/usecase';
import { ApolloContext } from '../../types';
import { COOKIE_NAME } from '../../util/Constants';
import { returnErrorToGQL } from '../../util/FunctionsForGqlResolver';
import { dtoUsersToGql, dtoUserToGql } from '../DTOtoGql';

const UserResolver: Resolvers<ApolloContext> = {
  Query: {
    getUserByCookie: async (_, __, { idInCookie }) => {
      if (idInCookie === undefined)
        return returnErrorToGQL('ログインが確認できませんでした');

      const usecaseResult = await useGetUserById.execute({ id: idInCookie });
      // console.log('me/usecaseResult:', usecaseResult);
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
      const gqlUser = dtoUserToGql(dtoUser);

      return { user: gqlUser };
    },
    loginUser: async (_, { input }, context) => {
      // console.log('arg:', args);
      const useCaseResult = await useLoginUserUsecase.execute({ ...input });
      if (useCaseResult.isLeft())
        return returnErrorToGQL(useCaseResult.value.getErrorValue());
      const gqlUser = dtoUserToGql(useCaseResult.value.getValue());
      // console.log('gqluser:', gqlUser);
      context.req.session.userId = gqlUser.id;
      return { user: gqlUser };
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
        return {
          result: false,
          message: useCaseResult.value.getErrorValue(),
        };
      // TODO::transplant this process to auth service
      req.session.destroy((err) => {
        console.log('err:', err);
      });
      res.clearCookie(COOKIE_NAME);
      return { result: true, message: 'ログアウトしました' };
    },
    deleteUser: async (_, __, { idInCookie, req, res }) => {
      // TODO:set up logger sentry or winston
      if (idInCookie === undefined)
        return { result: false, ...returnErrorToGQL('ログインしていません') };
      const result = await useDeleteUserUsecase.execute({ userId: idInCookie });
      if (result.isLeft())
        return {
          result: false,
          ...returnErrorToGQL(result.value.getErrorValue()),
        };
      req.session.destroy((err) => {
        console.log('err:', err);
      });
      res.clearCookie(COOKIE_NAME);
      return {
        result: true,
        message: 'アカウントの削除に成功しました',
      };
    },
    forgetPassword: async (_, { email }) => {
      const result = await useForgotPasswordUsecase.execute(email);
      if (result.isLeft())
        return { result: false, message: result.value.getErrorValue() };
      return { result: true, message: 'パスワード再登録メールを送信しました' };
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
      const gqlUser = dtoUserToGql(dtoUser);

      return { user: gqlUser };
    },
    // replyMessage:async () => {},
    // sendMessage: async() => {},

    // FIXME:メーラーの実装を待ってから
    // changePassword: async () => {},
  },
};

export { UserResolver };
