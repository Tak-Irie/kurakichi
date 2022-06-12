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

import { Resolvers } from '../generated/generatedTypes';

import { ApolloContext } from '../../@types/global';
import { ssoLogin } from '../../service/SSOService';
import { COOKIE_NAME } from '../../util/Constants';
import { returnErrorToGQL } from '../../util/FunctionsForGqlResolver';
import { dtoUsersToGql, dtoUserToGql, readUserToGql } from '../DTOtoGql';

export const UserResolver: Resolvers<ApolloContext> = {
  Query: {
    getUserByCookie: async (_, __, { idInCookie }) => {
      // console.log('cookie:', idInCookie);
      if (idInCookie === undefined) {
        return {
          __typename: 'Errors',
          applicationError: { message: 'miss' },
        };
      }

      // console.log('confirm cookie!:');
      // FIXME:CQRS
      // const usecaseResult = await useGetUserById.execute({ id: idInCookie });
      // console.log('me/usecaseResult:', usecaseResult);
      // if (usecaseResult.isLeft())
      //   return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const res = await getUserMyInfo(idInCookie);
      if (res === false) return returnErrorToGQL('wip');

      const user = readUserToGql(res);
      return {
        __typename: 'User',
        ...user,
      };
    },

    getUserById: async (_, { userId }) => {
      const usecaseResult = await useGetUserById.execute({ id: userId });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const user = dtoUserToGql(usecaseResult.value.getValue());
      return {
        __typename: 'User',
        ...user,
      };
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
      // console.log('catch input:', input);
      // console.log('catch input:', context);
      const usecaseResult = await useRegisterUserUsecase.execute({
        ...input,
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      const dtoUser = usecaseResult.value.getValue();
      // console.log('stoUser:', dtoUser);
      context.req.session.userId = dtoUser.id;
      // context.req.session.save;
      // console.log('session-userId:', context.req.session.userId);
      const user = dtoUserToGql(dtoUser);
      // console.log('user:', user);
      return {
        ...user,
      };
    },
    loginUser: async (_, { input }, context) => {
      // console.log('arg:', args);
      const useCaseResult = await useLoginUserUsecase.execute({ ...input });
      if (useCaseResult.isLeft())
        return returnErrorToGQL(useCaseResult.value.getErrorValue());
      const gqlUser = dtoUserToGql(useCaseResult.value.getValue());
      context.req.session.userId = gqlUser.id;
      // console.log('gqluser:', gqlUser);
      return {
        __typename: 'User',
        ...gqlUser,
      };
    },
    ssoLogin: async (_, { provider }, { req }) => {
      const authUrl = await ssoLogin({ provider, sessionID: req.sessionID });
      if (authUrl === 'ERROR') {
        return {
          __typename: 'Errors',
          applicationError: { message: 'something wrong' },
        };
      }
      req.session.authSession = req.sessionID;
      return { __typename: 'SSO', url: authUrl };
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
      return { __typename: 'Succeeded', succeeded: 'ログアウトしました' };
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
        __typename: 'Succeeded',
        succeeded: 'アカウントの削除に成功しました',
      };
    },
    forgetPassword: async (_, { email }) => {
      const result = await useForgotPasswordUsecase.execute(email);
      if (result.isLeft())
        return returnErrorToGQL(result.value.getErrorValue());
      return {
        __typename: 'Succeeded',
        succeeded: 'パスワード再登録メールを送信しました',
      };
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
      const user = dtoUserToGql(dtoUser);
      return {
        __typename: 'User',
        ...user,
      };
    },
    // replyMessage:async () => {},
    // sendMessage: async() => {},

    // FIXME:メーラーの実装を待ってから
    // changePassword: async () => {},
  },
};
