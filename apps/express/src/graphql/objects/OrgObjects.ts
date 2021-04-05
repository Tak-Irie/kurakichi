import { list, objectType } from 'nexus';

export const Org = objectType({
  name: 'Org',
  definition(t) {
    t.implements('Node');
    t.nonNull.string('orgName');
    t.nonNull.string('location');
    t.nonNull.string('email');
    t.nonNull.string('phoneNumber');
    t.string('image');
    t.string('icon');
    t.string('description');
    t.string('homePage');
    t.field('members', { type: list('User') });
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
