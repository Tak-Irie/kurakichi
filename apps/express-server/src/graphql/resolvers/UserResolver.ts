import { extendType, nonNull, stringArg } from 'nexus';
import { getUserId } from '../../util/getUserId';
import {
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
      type: 'User',
      resolve: (_, __, context) => {
        const userId = getUserId(context);
        if (userId) console.log('userId:', userId);
        return context.prisma.user.findUnique({
          where: {
            id: '1',
          },
        });
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
        console.log('args:', args);
        const user = await useLoginUserUseCase.execute({ ...args });
        if (user.isLeft()) return { message: user.value.getErrorValue() };
        context.req.session.userId = user.value.getValue().id;
        return { message: 'success!', user: { ...user.value.getValue() } };
      },
    });
  },
});

export { userQuery, userMutation };
