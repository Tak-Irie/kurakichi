// import path from 'path';
import { makeSchema } from 'nexus';
import * as path from 'path';

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
      '/Users/tak/development/kurakichi2/apps/express/src/util/context.ts',
    // module: path.join(__dirname, '../util/context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '/Users/tak/development/kurakichi2/apps/express/src/graphql/sourceTypes.ts',
        // module: path.join('./sourceTypes.ts'),
        alias: 'types',
      },
    ],
  },
});

export { GraphqlSchema };
