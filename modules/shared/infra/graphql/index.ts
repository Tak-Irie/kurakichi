import { readFileSync } from "fs";

import { userResolver } from "./user/resolver";
import { orgResolver } from "./org/resolver";

const userTypeDefs = readFileSync(`${__dirname}/user/schema.graphql`).toString(
  "utf-8"
);
const orgTypeDefs = readFileSync(`${__dirname}/org/schema.graphql`).toString(
  "utf-8"
);
const sharedTypeDefs = readFileSync(
  `${__dirname}/shared/schema.graphql`
).toString("utf-8");

export const typeDefs = [userTypeDefs, orgTypeDefs, sharedTypeDefs];
export const resolvers = [userResolver, orgResolver];
