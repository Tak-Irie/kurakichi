import { User as StoredUser, Message as StoredMessage, Organization, Room } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { User, UserEmail, UserName, UserPassword } from '../domain';

type StoredUserRelation = StoredUser & {
  receivedMessages?: StoredMessage[];
  belongOrg?: Organization[];
  belongRoom?: Room[];
};

export class UserMapper {
  public static async ToDomain(storedUser: StoredUserRelation): Promise<User> {
    let password: UserPassword | undefined;
    let messages: UniqueEntityId[] | undefined;
    let belongOrg: UniqueEntityId[] | undefined;
    let belongRoom: UniqueEntityId[] | undefined;

    const userNameResult = UserName.create({ userName: storedUser.name });

    if (storedUser.password) {
      const result = await UserPassword.create({
        password: storedUser.password,
        isHashed: true,
      });
      password = result.getValue();
    }

    // FIXME:abstract them
    if (storedUser.receivedMessages) {
      messages = storedUser.receivedMessages.map((m) => new UniqueEntityId(m.id));
    }
    if (storedUser.belongOrg) {
      belongOrg = storedUser.belongOrg.map((m) => new UniqueEntityId(m.id));
    }
    if (storedUser.belongRoom) {
      belongRoom = storedUser.belongRoom.map((m) => new UniqueEntityId(m.id));
    }

    const userEmailResult = UserEmail.create({ email: storedUser.email });

    const userResult = new User({
      id: new UniqueEntityId(storedUser.id),
      userName: userNameResult.getValue(),
      password,
      email: userEmailResult.getValue(),
      messages,
      belongOrg,
      belongRoom,
      role: storedUser.role,
    });

    return userResult;
  }

  public static async toStore(user: User): Promise<Omit<StoredUser, 'createdAt' | 'updatedAt'>> {
    return {
      id: user.getId(),
      name: user.getUsername(),
      email: user.getEmail(),
      password: user.getPassword() || 'IT_IS_SSO_USER',
      ssoSub: user.props.ssoSub || 'IT_IS_KURAKICHI_ORIGINAL_USER',
      picture: user.props.picture || 'UNKNOWN',
      role: 'USER',
    };
  }
}
