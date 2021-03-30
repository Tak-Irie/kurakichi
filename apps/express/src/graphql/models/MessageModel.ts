import { objectType } from 'nexus';

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.implements('Node');
  },
});
