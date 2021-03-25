import { makeSchema } from 'nexus';
import * as path from 'path';

import * as types from './bundleTypes';

const GraphqlSchema = makeSchema({
  types,
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  outputs: {
    schema:
      // __dirname + '/generated/schema.graphql',
      '/Users/tak/development/kurakichi/apps/express/src/graphql/generated/shcema.graphql',
    typegen:
      // __dirname + '/generated/nexus.d.ts',
      '/Users/tak/development/kurakichi/apps/express/src/graphql/generated/nexus.d.ts',
  },
  contextType: {
    module:
      // TODO: only dev
      '/Users/tak/development/kurakichi/apps/express/src/util/context.ts',
    // path.join(__dirname, '../util/context.ts'),
    export: 'MyContext',
  },
  sourceTypes: {
    modules: [
      {
        module: '/Users/tak/development/kurakichi/apps/express/src/graphql/sourceTypes.ts',
        // module: path.join('./sourceTypes.ts'),
        alias: 'types',
      },
    ],
  },
});

export { GraphqlSchema };
