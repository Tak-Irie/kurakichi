import { extendType, nonNull, stringArg } from 'nexus';
import { getUserId } from '../../util/getUserId';
import { RegisterUserUseCase } from '../../modules/user/useCases/registerUser/RegisterUserUseCase';
import { UserRepository } from '../../modules/user/infrastructure/UserRepository';

const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_, __, context) => {
        return context.prisma.user.findMany();
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
      type: 'UserResponse',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        username: nonNull(stringArg()),
      },
      resolve: async (_, args) => {
        const re = new RegisterUserUseCase(new UserRepository());
        const user = await re.execute({ ...args });
        if (user.isLeft()) return { message: user.value.getErrorValue() };
        return { message: 'success!' };
      },
    });
  },
});

export { userQuery, userMutation };
