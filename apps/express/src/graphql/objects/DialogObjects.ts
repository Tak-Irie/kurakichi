import { list, objectType } from 'nexus';

export const Dialog = objectType({
  name: 'Dialog',
  definition(t) {
    t.implements('Node');
    t.nonNull.string('dialogContent');
  },
});

export const DialogPayload = objectType({
  name: 'DialogPayload',
  definition(t) {
    t.field('dialog', { type: list('Dialog') });
    t.field('error', { type: 'RegularError' });
  },
});
