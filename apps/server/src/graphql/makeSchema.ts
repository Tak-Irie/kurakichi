import { makeSchema, fieldAuthorizePlugin } from 'nexus';
// import * as path from 'path';

import * as types from './bundleTypes';

const GraphqlSchema = makeSchema({
  types,
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  outputs: {
    schema:
      // __dirname + '/generated/schema.graphql',
      '/Users/tak/development/_kurakichi_shadow_nx/apps/express/src/graphql/generated/schema.graphql',
    typegen:
      // __dirname + '/generated/nexus.d.ts',
      '/Users/tak/development/_kurakichi_shadow_nx/apps/express/src/graphql/generated/nexus.d.ts',
  },
  contextType: {
    module:
      // TODO: only dev
      '/Users/tak/development/_kurakichi_shadow_nx/apps/express/src/util/context.ts',
    // path.join(__dirname, '../util/context.ts'),
    export: 'MyContext',
  },
  sourceTypes: {
    modules: [
      {
        module:
          '/Users/tak/development/_kurakichi_shadow_nx/apps/express/src/graphql/sourceTypes.ts',
        // module: path.join('./sourceTypes.ts'),
        alias: 'types',
      },
    ],
  },
  plugins: [fieldAuthorizePlugin()],
});

export { GraphqlSchema };
