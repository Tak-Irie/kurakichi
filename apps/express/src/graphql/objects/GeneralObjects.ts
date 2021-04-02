import { interfaceType, objectType } from 'nexus';

export const Node = interfaceType({
  name: 'Node',
  description: 'Identifier',
  resolveType: (data) => {
    return 'content' in data
      ? 'Message'
      : 'orgName' in data
      ? 'Org'
      : 'userName' in data
      ? 'User'
      : 'dialogName' in data
      ? 'Dialog'
      : undefined;
  },
  definition(t) {
    t.nonNull.id('id', { description: 'GUID for a resource' });
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
