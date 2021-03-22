import { list, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('email');
    t.string('username');
    t.string('password');
  },
});

export const UserResponse = objectType({
  name: 'UserResponse',
  definition(t) {
    t.nonNull.string('id');
    t.string('email');
    t.string('username');
  },
});

export const getUser = objectType({
  name: 'getUser',
  definition(t) {
    t.nonNull.string('message');
    t.nullable.field('user', { type: 'UserResponse' });
    t.nullable.field('users', { type: list('UserResponse') });
  },
});
