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
    const userResult = User.restoreFromRepo({
      ...props,
      userName: name,
      belongOrgs: getIdFromObjectInArray(belongOrgs),
      belongSecureBases: getIdFromObjectInArray(belongSecureBases),
      messages: getIdFromObjectInArray(receivedMessages),
    });

    return userResult;
  }
  // FIXME: re-architect whole persistence layer. below mapper is seriously ugly
  // this distortion is made by coexistence of simple CRUD and DDD. need to implement CQRS

  // public static async ToDomain(storedUser: StoredUserRelation): Promise<User> {
  //   // console.log('storedUser:', storedUser);
  //   let password: UserPassword | undefined;
  //   let messages: Message[];
  //   let belongOrgs: Org[];
  //   let belongSecureBases: SecureBase[];

  //   const userNameResult = UserName.create({ userName: storedUser.name });

  //   if (storedUser.password) {
  //     const result = await UserPassword.create({
  //       password: storedUser.password,
  //       isHashed: true,
  //     });
  //     password = result.getValue();
  //   }

  //   if (storedUser.receivedMessages) {
  //     messages = storedUser.receivedMessages.map((message) => MessageMapper.ToDomain(message));
  //   }

  //   if (storedUser.belongOrgs) {
  //     belongOrgs = storedUser.belongOrgs.map((org) => OrgMapper.ToDomain(org));
  //   }
  //   if (storedUser.belongSecureBases) {
  //     belongSecureBases = storedUser.belongSecureBases.map((secureBase) =>
  //       SecureBaseMapper.ToDomain(secureBase),
  //     );
  //   }
  //   // console.log('belongBases:', belongSecureBases);
  //   const userEmailResult = UserEmail.create({ email: storedUser.email });

  //   const userResult = User.restoreFromRepo({
  //     id: UniqueEntityId.reconstruct(storedUser.id).getValue(),
  //     userName: userNameResult.getValue(),
  //     password,
  //     email: userEmailResult.getValue(),
  //     avatar: storedUser.avatar,
  //     description: storedUser.description,
  //     image: storedUser.image,
  //     messages,
  //     belongOrgs,
  //     belongSecureBases,
  //     role: storedUser.role,
  //   });

  //   return userResult;
  // }

  public static async toStore(user: User): Promise<Omit<StoredUser, 'createdAt' | 'updatedAt'>> {
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
