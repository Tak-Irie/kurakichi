import { objectType } from 'nexus';

// TODO: temp, expand it later
export const GeneralResponse = objectType({
  name: 'GeneralResponse',
  definition(t) {
    t.boolean('result');
    t.nullable.string('message');
  },
});
