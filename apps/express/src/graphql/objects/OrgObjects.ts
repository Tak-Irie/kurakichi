import { list, objectType } from 'nexus';

export const Org = objectType({
  name: 'Org',
  definition(t) {
    t.implements('Node');
    t.string('orgName');
    t.string('location');
    t.string('email');
    t.string('phoneNumber');
    t.string('image');
    t.string('avatar');
    t.string('description');
    t.string('homePage');
    t.field('members', { type: list('User') });
    t.field('inquiries', { type: list('Inquiry') });
  },
});

export const OrgPayload = objectType({
  name: 'OrgPayload',
  definition(t) {
    t.field('org', { type: 'Org' });
    t.field('orgs', { type: list('Org') });
    t.field('error', { type: 'RegularError' });
  },
});
