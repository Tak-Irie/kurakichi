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
} from '@kurakichi/domain';
import { COOKIE_NAME } from '@kurakichi/node-util';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';
import { userToPresentation } from '../toPresentationDTO/userToPresentation';

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUsers', {
      type: 'UserPayload',
      resolve: async () => {
        const users = await useGetUsersUseCase.execute();
        if (users.isLeft()) return { error: { message: users.value.getErrorValue() } };
        const domainData = users.value.getValue();
        const gqlField = domainData.map((user) => userToPresentation(user));

        return { users: gqlField };
      },
    });

    t.nullable.field('me', {
      type: 'UserPayload',
      resolve: async (_, __, context) => {
        // console.log('me query called');

        const idRes = getUserIdByCookie(context);
        // console.log('idRes:', idRes);
        if (idRes.result === false) return { message: idRes.errMessage };

        const result = await useGetUserById.execute(idRes.id);
        // console.log('res:', result);
        if (result.isLeft()) return { message: result.value.getErrorValue() };

        const domainUser = result.value.getValue();
        console.log('domainUser:', domainUser);
        return {
          user: domainUser,
        };
      },
    });
  },
});

export const userMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('userRegister', {
      type: 'UserPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        userName: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        console.log('getConn');
        const result = await useRegisterUserUseCase.execute({ ...args });
        if (result.isLeft()) return { error: { message: result.value.getErrorValue() } };
        const user = result.value.getValue();
        // console.log('user:', user);
        context.req.session.userId = user.id;
        // console.log('session:', context.req.session.userId);
        return { user };
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
        const user = await useLoginUserUseCase.execute({ ...args });
        if (user.isLeft()) return { error: { message: user.value.getErrorValue() } };
        const data = user.value.getValue();
        // console.log('data:', data);
        context.req.session.userId = data.id;
        return { user: data };
      },
    });
    // TODO::check below
    t.field('logout', {
      type: 'RegularPayload',
      resolve: async (_, __, context) => {
        const req = context.req;
        const userId = req.session.userId;
        // TODO:set up logger sentry or winston
        if (userId === undefined) return { result: false, message: '不正検出' };
        const result = await useLogoutUserUseCase.execute({ userId });
        if (result.isLeft()) return { result: false, message: result.value.getErrorValue() };
        // TODO::transplant this process to auth service
        req.session.destroy((err) => {
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
        return { result: true };
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
  },
});
