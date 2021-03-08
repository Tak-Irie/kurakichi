import { extendType, nonNull, stringArg } from 'nexus';
import { ulid } from 'ulid';

const TestQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getTests', {
      type: 'Test',
      resolve: async (_, __, context) => {
        const tests = await context.prisma.test.findMany();
        return tests;
      },
    });
  },
});

const TestMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('testRegister', {
      type: 'Test',
      args: {
        name: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        const test = await context.prisma.test.create({
          data: { id: ulid(), ...args },
        });
        return test;
      },
    });
  },
});

export { TestQuery, TestMutation };

// }

// @Resolver(StoredTest)
// export class TestResolver {
//   @Query(() => TestResponse)
//   async getTests() {
//     const result = await StoredTest.find();
//     return { tests: result };
//   }

//   @Mutation(() => TestResponse)
//   async register(@Arg('name') name: string): Promise<TestResponse> {
//     console.log('got access:');
//     const result = await StoredTest.create({
//       id: ulid(),
//       name: name,
//     }).save();

//     if (result === null)
//       return {
//         errors: { field: 'some', message: 'fail!' },
//       };

//     return { test: result };
//   }
// }
