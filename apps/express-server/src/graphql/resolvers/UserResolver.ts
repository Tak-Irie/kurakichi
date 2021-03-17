import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserId';
import {
  useChangePasswordUseCase,
  useDeleteUserUseCase,
  useForgotPasswordUseCase,
  useGetUserById,
  useGetUsersUseCase,
  useLoginUserUseCase,
  useLogoutUserUseCase,
  useRegisterUserUseCase,
} from '../../modules/user/useCases';
import { userToPresentation } from '../toPresentationDTO/userToPresentation';
import { COOKIE_NAME } from '../../util/constants';

const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUsers', {
      type: 'getUser',
      resolve: async () => {
        const users = await useGetUsersUseCase.execute();
        if (users.isLeft()) return { message: users.value.getErrorValue() };
        const data = users.value.getValue();
        const data2 = data.map((user) => userToPresentation(user));

        return { message: 'success!', users: data2 };
      },
    });

    t.nullable.field('me', {
      type: 'getUser',
      resolve: async (_, __, context) => {
        console.log('me query called');
        const userId = getUserIdByCookie(context);
        // console.log('id:', userId);
        if (userId === undefined) return { message: 'not logged in' };
        const result = await useGetUserById.execute(userId);
        // console.log('res:', result);
        if (result.isLeft()) return { message: result.value.getErrorValue() };
        const user = result.value.getValue();
        // console.log('user:', user);
        return {
          message: 'logged in',
          user: { id: user.id, username: user.username },
        };
      },
    });
  },
});

const userMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('userRegister', {
      type: 'getUser',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        username: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        const result = await useRegisterUserUseCase.execute({ ...args });
        if (result.isLeft()) return { message: result.value.getErrorValue() };
        const user = result.value.getValue();
        context.req.session.userId = user.id;
        return { message: 'success!', user: { id: user.id } };
      },
    });
    t.field('login', {
      type: 'getUser',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        const user = await useLoginUserUseCase.execute({ ...args });
        if (user.isLeft()) return { message: user.value.getErrorValue() };
        const data = user.value.getValue();
        context.req.session.userId = data.id;
        return { message: 'success!', user: { ...user.value.getValue() } };
      },
    });
    // TODO::check below
    t.field('logout', {
      type: 'GeneralResponse',
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
      type: 'GeneralResponse',
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
      type: 'GeneralResponse',
      args: { email: nonNull(stringArg()) },
      resolve: async (_, args) => {
        const result = await useForgotPasswordUseCase.execute(args.email);
        if (result.isLeft()) return { result: false, message: result.value.getErrorValue() };
        return { result: true };
      },
    });
    t.field('changePassword', {
      type: 'GeneralResponse',
      args: {
        currentPass: nonNull(stringArg()),
        newPass: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        const id = context.req.session.id;
        if (id === undefined) return { result: false, message: 'ログインして下さい' };
        const result = await useChangePasswordUseCase.execute({
          currentPass: args.currentPass,
          newPass: args.newPass,
          userId: id,
        });
        if (result.isLeft()) return { result: false, message: result.value.getErrorValue() };
        return { result: true };
      },
    });
  },
});

export { userQuery, userMutation };
