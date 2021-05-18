import { extendType, nonNull, stringArg } from 'nexus';
import {
  useGetUsersUseCase,
  useGetUserById,
  useRegisterUserUseCase,
  useLoginUserUseCase,
  useLogoutUserUseCase,
  useDeleteUserUseCase,
  useForgotPasswordUseCase,
  useChangePasswordUseCase,
  useUpdateUserUseCase,
  useGetOrgsByMemberIdUseCase,
  useGetMessagesByReceiverIdUseCase,
  useGetUsersByIdsUseCase,
} from '@kurakichi/domain';
import { COOKIE_NAME } from '@kurakichi/node-util';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';
import {
  dtoMessagesToGql,
  dtoMessagesWithSenderToGql,
  dtoOrgsToGql,
  dtoUserToGql,
} from '../DTOtoGql';
import { returnErrorToGQL } from '../../util/returnErrorToGQL';

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUsers', {
      type: 'UserPayload',
      resolve: async () => {
        const useCaseResult = await useGetUsersUseCase.execute();
        if (useCaseResult.isLeft()) return returnErrorToGQL(useCaseResult);
        const dtoUsers = useCaseResult.value.getValue();
        // console.log('domainData:', domainData);
        const gqlUsers = dtoUsers.map((user) => dtoUserToGql(user));

        return { users: gqlUsers };
      },
    });

    t.nullable.field('getUserById', {
      type: 'UserPayload',
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: async (_, arg) => {
        const useCaseResult = await useGetUserById.execute(arg.userId);
        if (useCaseResult.isLeft()) return returnErrorToGQL(useCaseResult);

        const gqlField = dtoUserToGql(useCaseResult.value.getValue());
        return {
          user: gqlField,
        };
      },
    });

    t.nullable.field('getUserByIdWithOrg', {
      type: 'UserPayload',
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: async (_, arg) => {
        const useCaseResult = await useGetUserById.execute(arg.userId);
        if (useCaseResult.isLeft()) return returnErrorToGQL(useCaseResult);

        const orgResult = await useGetOrgsByMemberIdUseCase.execute({ memberId: arg.userId });
        if (orgResult.isLeft()) return returnErrorToGQL(orgResult);

        const gqlUser = dtoUserToGql(useCaseResult.value.getValue());
        const gqlOrgs = dtoOrgsToGql(orgResult.value.getValue());
        return {
          user: { ...gqlUser, belongOrgs: gqlOrgs },
        };
      },
    });

    t.nullable.field('getUserByCookie', {
      type: 'UserPayload',
      resolve: async (_, __, context) => {
        // console.log('me query called, session:', context.req.session);
        const idOrErr = getUserIdByCookie(context);
        // console.log('idOrErr:', idOrErr);
        if (typeof idOrErr === 'object') return idOrErr;

        const useCaseResult = await useGetUserById.execute(idOrErr);
        // console.log('me/useCaseResult:', useCaseResult);
        if (useCaseResult.isLeft()) return returnErrorToGQL(useCaseResult);

        const domainOrgOrErr = await useGetOrgsByMemberIdUseCase.execute({ memberId: idOrErr });
        if (domainOrgOrErr.isLeft()) return returnErrorToGQL(domainOrgOrErr);

        // console.log('org[]:', domainOrgOrErr);

        const dtoMessagesOrErr = await useGetMessagesByReceiverIdUseCase.execute({
          receiverId: idOrErr,
        });
        if (dtoMessagesOrErr.isLeft()) return returnErrorToGQL(dtoMessagesOrErr);
        // console.log('dtoMessages::', dtoMessagesOrErr);

        const gqlUser = dtoUserToGql(useCaseResult.value.getValue());
        const gqlOrgs = dtoOrgsToGql(domainOrgOrErr.value.getValue());

        // TODO:temporary impl, need CQRS(Read Model)
        // const gqlMessages = dtoMessagesToGql(dtoMessageOrErr.value.getValue());
        const tempMess = dtoMessagesOrErr.value.getValue();
        if (tempMess[0]) {
          const temp = await useGetUsersByIdsUseCase.execute({
            ids: tempMess.map((message) => message.senderId),
          });
          if (temp.isLeft()) return returnErrorToGQL(temp);
          const _gqlMessages = dtoMessagesWithSenderToGql(tempMess, temp.value.getValue());
          return {
            user: { ...gqlUser, belongOrgs: gqlOrgs, messages: _gqlMessages },
          };
        }
        // TODO:temp end

        const gqlMessages = dtoMessagesToGql(dtoMessagesOrErr.value.getValue());
        // console.log('domainUser:', { gqlUser, gqlOrgs, _gqlMessages });
        return {
          user: { ...gqlUser, belongOrgs: gqlOrgs, messages: gqlMessages },
        };
      },
    });
  },
});

export const userMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('registerUser', {
      type: 'UserPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        // console.log('getConn, args', args);
        const useCaseResult = await useRegisterUserUseCase.execute({ ...args });
        if (useCaseResult.isLeft()) return returnErrorToGQL(useCaseResult);
        const dtoUser = useCaseResult.value.getValue();
        // console.log('stoUser:', dtoUser);
        context.req.session.userId = dtoUser.id;
        // console.log('session:', context.req.session.userId);
        const gqlUser = dtoUserToGql(dtoUser);

        return { user: gqlUser };
      },
    });
    t.field('login', {
      type: 'UserPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        // console.log('arg:', args);
        const useCaseResult = await useLoginUserUseCase.execute({ ...args });
        if (useCaseResult.isLeft()) return returnErrorToGQL(useCaseResult);
        const gqlUser = dtoUserToGql(useCaseResult.value.getValue());
        // console.log('gqluser:', gqlUser);
        context.req.session.userId = gqlUser.id;
        return { user: gqlUser };
      },
    });
    // TODO::check below
    t.field('logout', {
      type: 'RegularPayload',
      resolve: async (_, __, context) => {
        const idOrErr = getUserIdByCookie(context);
        // console.log('idOrErr:', idOrErr);
        if (typeof idOrErr === 'object') return { result: false, message: 'ログインしていません' };
        const useCaseResult = await useLogoutUserUseCase.execute({ userId: idOrErr });
        if (useCaseResult.isLeft())
          return { result: false, message: useCaseResult.value.getErrorValue() };
        // TODO::transplant this process to auth service
        context.req.session.destroy((err) => {
          console.log('err:', err);
        });
        context.res.clearCookie(COOKIE_NAME);
        return { result: true, message: 'ログアウトしました' };
      },
    });
    t.field('deleteUser', {
      type: 'RegularPayload',
      resolve: async (_, __, context) => {
        const req = context.req;
        const userId = req.session.userId;
        // TODO:set up logger sentry or winston
        if (userId === undefined) return { result: false, message: '不正検出' };
        const result = await useDeleteUserUseCase.execute({ userId });
        if (result.isLeft()) return { result: false, message: result.value.getErrorValue() };
        req.session.destroy((err) => {
          console.log('err:', err);
        });
        context.res.clearCookie(COOKIE_NAME);
        return { result: true, message: 'アカウントの削除に成功しました' };
      },
    });
    t.field('forgetPassword', {
      type: 'RegularPayload',
      args: { email: nonNull(stringArg()) },
      resolve: async (_, args) => {
        const result = await useForgotPasswordUseCase.execute(args.email);
        if (result.isLeft()) return { result: false, message: result.value.getErrorValue() };
        return { result: true, message: 'パスワード再登録メールを送信しました' };
      },
    });
    t.field('changePassword', {
      type: 'RegularPayload',
      args: {
        currentPass: nonNull(stringArg()),
        newPass: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        const id = context.req.session.userId;
        if (id === undefined) return { result: false, message: 'ログインして下さい' };
        const result = await useChangePasswordUseCase.execute({
          currentPass: args.currentPass,
          newPass: args.newPass,
          userId: id,
        });
        if (result.isLeft()) return { result: false, message: result.value.getErrorValue() };
        return { result: true, message: '変更に成功しました' };
      },
    });
    t.field('updateUser', {
      type: 'UserPayload',
      args: {
        userName: stringArg(),
        email: stringArg(),
        description: stringArg(),
        avatar: stringArg(),
        image: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const idOrErr = getUserIdByCookie(ctx);
        if (typeof idOrErr === 'object') return idOrErr;

        const { email, description, avatar, image, userName } = args;
        const useCaseResult = await useUpdateUserUseCase.execute({
          userId: idOrErr,
          userName,
          avatar,
          description,
          email,
          image,
        });

        if (useCaseResult.isLeft()) return returnErrorToGQL(useCaseResult);

        const dtoUser = useCaseResult.value.getValue();
        const gqlUser = dtoUserToGql(dtoUser);

        return { user: gqlUser };
      },
    });
  },
});
