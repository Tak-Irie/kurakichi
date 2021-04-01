import { list, objectType } from 'nexus';

export const Org = objectType({
  name: 'Org',
  definition(t) {
    t.implements('Node');
    t.nonNull.string('orgName');
    t.nonNull.string('location');
    t.list.field('member', { type: 'User' });
  },
});

export const OrgPayload = objectType({
  name: 'OrgPayload',
  definition(t) {
    t.field('org', { type: list('Org') });
    t.field('error', { type: 'Error' });
  },
});
