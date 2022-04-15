import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import {
  BaseResolver,
  InquiryResolver,
  MessageResolver,
  OrgResolver,
  ScalarResolverMap,
  UserResolver,
} from './resolvers';

const typeDefs = readFileSync(
  resolve(__dirname, './generated/generatedSchema.graphql'),
).toString('utf-8');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [
    UserResolver,
    MessageResolver,
    OrgResolver,
    BaseResolver,
    InquiryResolver,
    ScalarResolverMap,
  ],
});

export { schema };
