import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.password();
    t.model.username();
    // t.model.role();
  },
});

export const UserResponse = objectType({
  name: 'UserResponse',
  definition(t) {
    t.string('message');
    t.nullable.field('user', { type: 'User' });
  },
});
