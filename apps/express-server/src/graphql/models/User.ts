import { objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.password();
    t.model.username();
    t.model.role();
  },
});

export { User };
