import { list, objectType } from 'nexus';

export const Org = objectType({
  name: 'Org',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.string('location');
  },
});

export const OrgResponse = objectType({
  name: 'OrgResponse',
  definition(t) {
    t.nonNull.string('message');
    t.nullable.field('orgs', { type: list('Org') });
  },
});
