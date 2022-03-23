import { MongoClient, Db } from "mongodb";
import { MongoCollections } from "./MongoTypes";
import { toDomain } from "./UserMapper";

import { UserRepository, User, UserEmail, UserPassword } from "../domain";

export class MongoUserRepository implements UserRepository {
  private mongoClient: MongoClient;
  constructor(mongoClient: MongoClient) {
    this.mongoClient = mongoClient;
  }

  private async connectDb() {
    await this.mongoClient.connect();
    const db = this.mongoClient.db("test");
    const userCollection: MongoCollections["user"] = db.collection("user");
    return userCollection;
  }

  async registerUser(user: User): Promise<boolean> {
    const collection = await this.connectDb();
    const result = await collection.insertOne({
      _id: user.getId(),
      name: user.getUsername(),
      email: user.getEmail(),
    });

    if (!result.acknowledged) return false;

    return true;
  }

  async getUsers(): Promise<User[]> {
    const collection = await this.connectDb();
    const results = await collection.find().toArray();
    const users = toDomain(results);

    return users;
  }
}
