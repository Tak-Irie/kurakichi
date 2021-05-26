import { list, objectType } from 'nexus';

export const SecureBase = objectType({
  name: 'SecureBase',
  description:
    "Place to dialog and plan to solve client's problem used by Clients(user) and Professionals(org member)",
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
