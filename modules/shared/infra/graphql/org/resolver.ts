import type { Resolvers } from "../resolvers-types";

const orgResolver: Resolvers = {
  Query: {
    org: async (_parent, args, _context, _info) => {
      const orgId = args.id;
      const org = { id: "123" };
      return org;
    },
    orgs: async (_parent, _args, _context, _info) => {
      const orgs = [{ id: "1" }, { id: "2" }];
      return orgs;
    },
  },
  Mutation: {},
};

export { orgResolver };
