import { list, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.implements('Node');
    t.nonNull.string('email');
    t.string('userName');
  },
});

export const UserPayload = objectType({
  name: 'UserPayload',
  definition(t) {
    t.field('user', { type: list('User') });
    t.field('error', { type: 'Error' });
  },
});
