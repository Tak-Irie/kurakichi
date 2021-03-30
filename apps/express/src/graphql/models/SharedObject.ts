import { interfaceType, list, objectType } from 'nexus';

// export const Node = interfaceType({
//   name: 'Node',
//   definition(t) {
//     t.nonNull.id('id', { description: 'GUID for a resource' });
//   },
//   resolveType: async (source) => {
//     return { id: source.id };
//   },
// });

// export const Nodes = objectType({
//   name: 'Nodes',
//   definition(t) {
//     t.field('ids', { type: list('Node'), description: 'list of node' });
//   },
// });

// TODO: temp, expand it later
export const GeneralResponse = objectType({
  name: 'GeneralResponse',
  definition(t) {
    t.boolean('result');
    t.nullable.string('message');
  },
});
