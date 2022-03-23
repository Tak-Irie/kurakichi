import { User as MongoUser } from "./MongoTypes";
import { User } from "../domain";

export const toDomain = (mongoUser: MongoUser[]): User[] => {
  const domainUsers = mongoUser.map((user) => {
    const { _id, email, name } = user;
    const domainUser = User.restore({
      id: _id,
      email,
      userName: name,
      password: "hogefuga",
    });
    return domainUser;
  });

  return domainUsers;
};
