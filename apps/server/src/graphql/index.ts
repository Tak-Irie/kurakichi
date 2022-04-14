import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { ScalarResolverMap, userResolver } from './resolvers';

const typeDefs = readFileSync(
  resolve(__dirname, './generated/generatedSchema.graphql'),
).toString('utf-8');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [userResolver, ScalarResolverMap],
});

export { schema };
