import { list, objectType } from 'nexus';

export const Room = objectType({
  name: 'Room',
  definition(t) {
    t.implements('Node');
    t.string('roomName');
    t.field('members', { type: list('User') });
  },
});

export const RoomPayload = objectType({
  name: 'RoomPayload',
  definition(t) {
    t.field('room', { type: 'Room' });
    t.field('error', { type: 'RegularError' });
  },
});
