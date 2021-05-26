import { list, objectType, inputObjectType } from 'nexus';

export const Org = objectType({
  name: 'Org',
  description:
    'Organization which is running welfare service like npo, hospital, clinic, gov/pref/city office, etc',
  definition(t) {
    t.implements('Node');
    t.string('orgName');
    t.string('location');
    t.float('latitude');
    t.float('longitude');
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
    t.field('pageInfo', { type: 'PageInfo' });
    t.field('error', { type: 'RegularError' });
  },
});

export const OrgUpdateInput = inputObjectType({
  name: 'OrgUpdateInput',
  definition(t) {
    t.string('orgName');
    t.string('location');
    t.string('email');
    t.string('phoneNumber');
    t.string('description');
    t.string('homePage');
    t.string('adminId');
  },
});
