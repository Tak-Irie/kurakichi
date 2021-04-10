import { list, objectType } from 'nexus';

export const DialogRoom = objectType({
  name: 'DialogRoom',
  definition(t) {
    t.implements('Node');
    t.field('roomOwner', { type: 'User', description: 'it indicate Client/Patient' });
    t.field('members', { type: list('User') });
  },
});

export const DialogRoomPayload = objectType({
  name: 'DialogRoomPayload',
  definition(t) {
    t.field('dialogRoom', { type: 'DialogRoom' });
    t.field('error', { type: 'RegularError' });
  },
});
