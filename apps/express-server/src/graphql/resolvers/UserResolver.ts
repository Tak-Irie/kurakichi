import { extendType, nonNull, stringArg } from 'nexus';
import { getUserId } from '../../util/getUserId';
import { RegisterUserUseCase } from '../../modules/user/useCases/registerUser/RegisterUserUseCase';
import { UserRepository } from '../../modules/user/infrastructure/UserRepository';
import { useGetUsersUseCase } from '../../modules/user/useCases';
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
        const re = new RegisterUserUseCase(new UserRepository());
        const user = await re.execute({ ...args });
        if (user.isLeft()) return { message: user.value.getErrorValue() };
        return { message: 'success!' };
      },
    });
  },
});

export { userQuery, userMutation };
