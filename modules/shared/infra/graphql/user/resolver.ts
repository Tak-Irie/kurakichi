import type { Resolvers } from "../resolvers-types";

const userResolver: Resolvers = {
  Query: {
    user: async (_parent, args, _context, _info) => {
      const userId = args.id;
      const user = { id: "123", name: "hoge", email: "fuga" };
      return user;
    },
  },
  Mutation: {
    registerUser: async (_parent, args, _context, _info) => {
      const { email, password } = args.input;
      return { user: { id: "1", email: "hoge", name: "fuga" } };
    },
  },
};

export { userResolver };
