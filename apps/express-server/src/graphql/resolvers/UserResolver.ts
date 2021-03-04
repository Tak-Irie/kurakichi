import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { ulid } from 'ulid';
import { getUserId } from '../../util/getUserId';

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
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        username: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        const user = await context.prisma.user.create({
          data: { id: ulid(), ...args },
        });
        return user;
      },
    });
  },
});
// @Resolver(StoredUser)
// export class UserResolver {
//   constructor(private readonly OrmUserRepository: TypeOrmUserRepository) {}

//   @Query(() => UserResponse, { nullable: true })
//   async userGetById(@Arg('id') id: string): Promise<UserResponse | null> {
//     const getUserByIdUseCase = new GetUserByIdUseCase(this.OrmUserRepository);
//     const result = await getUserByIdUseCase.execute(id);
//     if (result.isLeft())
//       return { message: result.value.getErrorValue(), user: null };

//     return { message: 'success', user: result.value.getValue() };
//   }

//   @Query(() => Users, { nullable: true })
//   async users(): Promise<Users | null> {
//     const getUsersUseCase = new GetUsersUseCase(this.OrmUserRepository);
//     const result = await getUsersUseCase.execute();
//     if (result.isLeft())
//       return { message: result.value.getErrorValue(), users: null };

//     return { message: 'success', users: result.value.getValue().users };
//   }

//   @Mutation(() => UserResponse)
//   async userRegister(
//     @Arg('options') options: UserInput,
//   ): Promise<UserResponse> {
//     const registerUserUseCase = new RegisterUserUseCase(this.OrmUserRepository);
//     const result = await registerUserUseCase.execute(options);
//     if (result.isLeft()) {
//       const response = { message: result.value.getErrorValue(), user: null };

//       return response;
//     }

//     return { message: 'registered!', user: null };
//   }
// }

export { userQuery, userMutation };
