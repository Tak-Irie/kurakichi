import { list, objectType } from 'nexus';

export const SecureBase = objectType({
  name: 'SecureBase',
  description: 'Place to dialog used by Professionals and Clients',
  definition(t) {
    t.implements('Node');
    t.field('baseOwner', { type: 'User', description: 'it indicate Client/Patient' });
    t.field('members', { type: list('User') });
  },
});

export const SecureBasePayload = objectType({
  name: 'SecureBasePayload',
  definition(t) {
    t.field('secureBase', { type: 'SecureBase' });
    t.field('error', { type: 'RegularError' });
  },
});
