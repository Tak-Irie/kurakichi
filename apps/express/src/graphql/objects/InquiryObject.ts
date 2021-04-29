import { enumType, list, objectType } from 'nexus';

export const Inquiry = objectType({
  name: 'Inquiry',
  description: 'Inquiry from User to Org',
  definition(t) {
    t.implements('Node');
    t.string('content');
    t.string('sentAt');
    t.field('category', { type: 'InquiryCategory' });
    t.field('inquiryStatus', { type: 'InquiryStatus' });
    t.field('sender', { type: 'User' });
  },
});

export const InquiryTree = objectType({
  name: 'InquiryTree',
  description: 'Inquiries Node, it connect original and response inquiry',
  definition(t) {
    t.implements('Node');
    t.field('inquiriesWithTree', { type: list('Inquiry') });
  },
});

export const InquiryPayload = objectType({
  name: 'InquiryPayload',
  definition(t) {
    t.field('inquiry', { type: 'Inquiry' });
    t.field('inquiries', { type: list('Inquiry') });
    t.field('inquiryTree', { type: 'InquiryTree' });
    t.field('error', { type: 'RegularError' });
  },
});

export const InquiryCategory = enumType({
  name: 'InquiryCategory',
  members: ['COUNSEL', 'INQUIRY', 'CONTACT', 'APPLICATION', 'OTHERS'],
});

export const InquiryStatus = enumType({
  name: 'InquiryStatus',
  members: ['UNREAD', 'DONE', 'WORKING', 'DRAFT'],
});
