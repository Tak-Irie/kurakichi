// import path from 'path';
import { makeSchema } from 'nexus';

import * as types from './bundleTypes';

const GraphqlSchema = makeSchema({
  types,
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.d.ts',
  },
  contextType: {
    module:
      // TODO: only dev
      '/Users/tak/development/kurakichi/apps/express-server/src/util/context.ts',
    // module: path.join(__dirname, 'context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '/Users/tak/development/kurakichi/apps/express-server/src/graphql/sourceTypes.ts',
        alias: 'types',
      },
    ],
  },
});

export { GraphqlSchema };
