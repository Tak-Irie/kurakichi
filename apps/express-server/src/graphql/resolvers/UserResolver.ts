import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserId';
import {
  useGetUserById,
  useGetUsersUseCase,
  useLoginUserUseCase,
  useRegisterUserUseCase,
} from '../../modules/user/useCases';
import { userToPresentation } from '../DTO/UserDTO';

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
        console.log('session:', context.req.session.userId);
        const userId = getUserIdByCookie(context);
        if (userId === undefined) return { message: 'not logged in' };
        const result = await useGetUserById.execute(userId);
        if (result.isLeft()) return { message: result.value.getErrorValue() };
        const user = result.value.getValue();
        return { message: 'logged in', user: { id: user.id } };
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
      resolve: async (_, args) => {
        const user = await useRegisterUserUseCase.execute({ ...args });
        if (user.isLeft()) return { message: user.value.getErrorValue() };
        return { message: 'success!' };
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
        console.log('user:', user.value.getValue());
        context.req.session.userId = user.value.getValue().id;
        return { message: 'success!', user: { ...user.value.getValue() } };
      },
    });
  },
});

export { userQuery, userMutation };
