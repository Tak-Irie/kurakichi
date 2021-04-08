import { enumType, list, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.implements('Node');
    t.string('email');
    t.string('userName');
    t.string('picture', { description: "user's image" });
    t.field('belongOrg', { type: list('Org') });
    t.field('belongRoom', { type: list('Room') });
    t.field('messages', { type: list('Message') });
    t.field('role', { type: 'UserRole' });
  },
});

export const UserPayload = objectType({
  name: 'UserPayload',
  definition(t) {
    t.field('user', { type: 'User' });
    t.field('users', { type: list('User') });
    t.field('error', { type: 'RegularError' });
  },
});

export const UserRole = enumType({
  name: 'UserRole',
  members: ['USER', 'PRO'],
});
