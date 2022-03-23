import { Collection } from "mongodb";

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type Org = {
  _id: string;
  name: string;
};

export type MongoCollections = {
  user: Collection<User>;
  org: Collection<Org>;
};
