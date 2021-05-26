import { list, objectType } from 'nexus';

export const Dialog = objectType({
  name: 'Dialog',
  description: 'used for chat in SecureBase',
  definition(t) {
    t.implements('Node');
    t.string('dialogContent');
    t.field('base', { type: 'SecureBase' });
  },
});

export const DialogPayload = objectType({
  name: 'DialogPayload',
  definition(t) {
    t.field('dialog', { type: list('Dialog') });
    t.field('error', { type: 'RegularError' });
  },
});
