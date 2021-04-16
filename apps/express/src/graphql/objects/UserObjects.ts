import { enumType, list, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.implements('Node');
    t.string('email');
    t.string('userName');
    t.string('avatar', { description: 'avatar used for icon' });
    t.string('image', { description: 'hero image used for individual page' });
    t.string('description', { description: 'self description' });
    t.field('belongOrgs', { type: list('Org') });
    t.field('belongSecureBases', { type: list('SecureBase') });
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
