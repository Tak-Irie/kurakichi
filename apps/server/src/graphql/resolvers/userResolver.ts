import { Resolvers } from "../generated/resolversTypes";

const userResolver: Resolvers = {
  Query: {
    getUsers: async () => {
      return await {
        users: [{ id: "hoge", name: "fuga", email: "hoge@example.com" }],
      };
    },
  },
  Mutation: {
    // registerUser: async (_parent, args, _context, _info) => {
    //   const { email, password, userName } = args;
    //   const result = await createUserUsecase.execute({
    //     email,
    //     password,
    //     userName,
    //   });
    //   if (result.isLeft()) {
    //     return tempUser;
    //   }
    //   result.value.getValue();
    //   return {
    //     id: "temp",
    //     email,
    //     userName,
    //   };
    // },
  },
};

export { userResolver };
