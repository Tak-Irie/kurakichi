import { enumType, list, objectType } from 'nexus';

export const Message = objectType({
  name: 'Message',
  description: 'Message from User to User',
  definition(t) {
    t.implements('Node');
    t.string('content');
    t.field('messageStatus', { type: 'MessageStatus' });
    t.field('sender', { type: 'User' });
    t.field('receiver', { type: 'User' });
  },
});

export const MessagePayload = objectType({
  name: 'MessagePayload',
  definition(t) {
    t.field('message', { type: 'Message' });
    t.field('messages', { type: list('Message') });
    t.field('error', { type: 'RegularError' });
  },
});

export const MessageStatus = enumType({
  name: 'MessageStatus',
  members: ['UNREAD', 'READ', 'DRAFT'],
});
