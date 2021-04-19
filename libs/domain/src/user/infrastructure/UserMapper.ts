import { User as StoredUser } from '@prisma/client';
import { User } from '../domain';
import { getIdFromObjectInArray } from '@kurakichi/node-util';

export type StoredUserRelation = StoredUser & {
  receivedMessages: {
    id: string;
  }[];
  belongOrgs: {
    id: string;
  }[];
  belongSecureBases: {
    id: string;
  }[];
};

export class UserMapper {
  public static ToDomain(storedUser: StoredUserRelation): User {
    // console.log('storedUser:', storedUser);
    const { name, receivedMessages, belongOrgs, belongSecureBases, ...props } = storedUser;
    const domainUser = User.restoreFromRepo({
      ...props,
      userName: name,
      belongOrgs: getIdFromObjectInArray(belongOrgs),
      belongSecureBases: getIdFromObjectInArray(belongSecureBases),
      messages: getIdFromObjectInArray(receivedMessages),
    });

    return domainUser;
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
