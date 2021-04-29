import { extendType, interfaceType, objectType } from 'nexus';

export const Node = interfaceType({
  name: 'Node',
  description: 'Identifier',
  resolveType: (data) => {
    return 'messageStatus' in data
      ? 'Message'
      : 'orgName' in data
      ? 'Org'
      : 'userName' in data
      ? 'User'
      : 'dialogName' in data
      ? 'Dialog'
      : 'baseOwner' in data
      ? 'SecureBase'
      : 'inquiryStatus' in data
      ? 'Inquiry'
      : 'messageWithTree' in data
      ? 'MessageTree'
      : undefined;
  },
  definition(t) {
    t.nonNull.id('id', { description: 'GUID for a resource' });
  },
});

export const NodeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('node', {
      type: 'Node',
      args: { id: 'ID' },
      resolve: (_, args) => {
        return { id: args.id };
      },
    });
  },
});

export const Error = objectType({
  name: 'RegularError',
  description: 'Generally Used as Error at business logic',
  definition(t) {
    t.nonNull.string('message');
    t.list.nonNull.string('invalidField');
  },
});

// TODO: temp, expand it later
export const GeneralResponse = objectType({
  name: 'RegularPayload',
  definition(t) {
    t.boolean('result');
    t.nullable.string('message');
  },
});

// export function connectionType(name: core.AllOutputTypes) {
//   const Connection = objectType({
//     name: `${name}Connection`,
//     definition(t) {
//       t.field('edges', { type: `${name}Edge` });
//     },
//   });
//   const Edge = objectType({
//     name: `${name}Edge`,
//     definition(t) {
//       t.id('cursor', (root) => `${name}:${root.id}`);
//       t.field('node', { type: name });
//     },
//   });
//   const PageInfo = objectType({
//     name: `${name}PageInfo`,
//     definition(t) {
//       t.boolean('hasNextPage');
//       t.boolean('hasPreviousPage');
//     },
//   });
//   return { Connection, Edge, PageInfo };
// }

// type PageInfo {
//   hasNextPage: Boolean!
//   hasPreviousPage: Boolean!
//   startCursor: String
//   endCursor: String
// }
// type User implements Node {
//   id: ID!
// }
// type UserEdge {
//   node: User!
//   cursor: String!
// }
// type UserConnection {
//   edges: [UserEdge!]!
//   pageInfo: PageInfo!
// }
// type Query {
//   users(first: Int, after: String, last: Int, before: String): UserConnection!
// }

// type Viewer {
//   name: String!
// }

// type Query {
//   viewer: Viewer
// }
