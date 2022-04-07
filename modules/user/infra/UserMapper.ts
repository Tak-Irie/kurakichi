import { User as StoredUser } from "@prisma/client";
import { getIdFromObjectInArray } from "../../shared/util";
import { User } from "../domain";

export type StoredUserRelation = StoredUser & {
  receivedMessages?: {
    id: string;
  }[];
  belongOrgs?: {
    id: string;
  }[];
  belongSecureBases?: {
    id: string;
  }[];
};

export class UserMapper {
  public static ToDomain(storedUser: StoredUserRelation): User {
    // console.log('storedUser:', storedUser);
    const { name, receivedMessages, belongOrgs, belongSecureBases, ...props } =
      storedUser;
    const domainUser = User.restoreFromRepo({
      ...props,
      userName: name,
      belongOrgs: belongOrgs ? getIdFromObjectInArray(belongOrgs) : [],
      belongSecureBases: belongSecureBases
        ? getIdFromObjectInArray(belongSecureBases)
        : [],
      messages: receivedMessages
        ? getIdFromObjectInArray(receivedMessages)
        : [],
    });

    return domainUser;
  }

  public static arrayToDomain(storedUser: StoredUserRelation[]): User[] {
    return storedUser.map((user) => UserMapper.ToDomain(user));
  }

  public static toStore(user: User): StoredUser {
    const {
      avatar,
      description,
      email,
      id,
      image,
      password,
      role,
      ssoSub,
      userName,
    } = user.getProps();
    return {
      id: id.getId(),
      name: userName.getValue(),
      email: email.getValue(),
      password: password.getValue(),
      ssoSub,
      avatar,
      image,
      description,
      role,
    };
  }
}
