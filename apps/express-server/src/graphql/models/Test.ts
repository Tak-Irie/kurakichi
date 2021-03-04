import { list, objectType } from 'nexus';

export const Test = objectType({
  name: 'Test',
  definition(t) {
    t.model.id();
    t.model.name();
  },
});

export const Tests = objectType({
  name: 'Tests',
  definition(t) {
    t.field('tests', { type: list('Test') });
  },
});
