// import path from 'path';
import { makeSchema } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';

import * as types from './schema';

const GraphqlSchema = makeSchema({
  types,
  plugins: [nexusPrisma()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.d.ts',
  },
  contextType: {
    module:
      '/Users/tak/development/kurakichi/apps/express-server/src/util/context.ts',
    // module: path.join(__dirname, 'context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});

export { GraphqlSchema };
