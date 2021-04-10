import {
  User as StoredUser,
  Message as StoredMessage,
  Organization,
  DialogRoom as StoredDialogRoom,
} from '@prisma/client';
import { Org } from '../../org/domain';
import { OrgMapper } from '../../org/infra';
import { UniqueEntityId } from '../../shared';
import { Message, User, UserEmail, UserName, UserPassword, DialogRoom } from '../domain';
import { DialogRoomMapper } from './DialogRoomMapper';
import { MessageMapper } from './MessageMapper';

type StoredUserRelation = StoredUser & {
  receivedMessages?: StoredMessage[];
  belongOrgs?: Organization[];
  belongDialogRooms?: StoredDialogRoom[];
};

// FIXME: re-architect whole persistence layer. below mapper is seriously ugly
// this distortion is made by coexistence of simple CRUD and DDD. need to implement CQRS
export class UserMapper {
  public static async ToDomain(storedUser: StoredUserRelation): Promise<User> {
    console.log('storedUser:', storedUser);
    let password: UserPassword | undefined;
    let messages: Message[];
    let belongOrgs: Org[];
    let belongDialogRooms: DialogRoom[];

    const userNameResult = UserName.create({ userName: storedUser.name });

    if (storedUser.password) {
      const result = await UserPassword.create({
        password: storedUser.password,
        isHashed: true,
      });
      password = result.getValue();
    }

    if (storedUser.receivedMessages) {
      messages = storedUser.receivedMessages.map((message) => MessageMapper.ToDomain(message));
    }

    if (storedUser.belongOrgs) {
      belongOrgs = storedUser.belongOrgs.map((org) => OrgMapper.ToDomain(org));
    }
    if (storedUser.belongDialogRooms) {
      belongDialogRooms = storedUser.belongDialogRooms.map((dialogRoom) =>
        DialogRoomMapper.ToDomain(dialogRoom),
      );
    }
    console.log('belongRooms:', belongDialogRooms);
    const userEmailResult = UserEmail.create({ email: storedUser.email });

    const userResult = new User({
      id: new UniqueEntityId(storedUser.id),
      userName: userNameResult.getValue(),
      password,
      email: userEmailResult.getValue(),
      messages,
      belongOrgs,
      belongDialogRooms,
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
