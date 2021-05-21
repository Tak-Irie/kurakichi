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
      : 'treedMessage' in data
      ? 'MessageTree'
      : 'treedInquiry' in data
      ? 'InquiryTree'
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
  description: 'Generally used as Error at business logic',
  definition(t) {
    t.nonNull.string('message');
    t.list.nonNull.string('invalidField');
  },
});

export const GeneralResponse = objectType({
  name: 'RegularPayload',
  description: "deprecated, use each object's specific payload",
  definition(t) {
    t.boolean('result');
    t.nullable.string('message');
  },
});

export const PageInfo = objectType({
  name: 'PageInfo',
  description:
    'used for scrollable objects like inquiries, messages, orgs. Kurakichi basically use cursor based pagination and infinite scroll.',
  definition(t) {
    t.boolean('hasMore');
    t.string('endCursor');
    t.nullable.int('limit');
  },
});
