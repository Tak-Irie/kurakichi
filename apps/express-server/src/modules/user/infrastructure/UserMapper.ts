import { User as StoredUser } from '@prisma/client';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';

export class UserMapper {
  public static toDomain(storedUser: StoredUser): User {
    const userNameResult = UserName.create({ username: storedUser.username });
    const userPasswordResult = UserPassword.create({
      password: storedUser.password,
      isHashed: true,
    });
    const userEmailResult = UserEmail.create({ email: storedUser.email });

    const userResult = new User({
      id: new UniqueEntityId(storedUser.id),
      username: userNameResult.getValue(),
      password: userPasswordResult.getValue(),
      email: userEmailResult.getValue(),
    });

    return userResult;
  }

  public static async toStore(
    user: User,
  ): Promise<Omit<StoredUser, 'createdAt' | 'updatedAt'>> {
    let hashedPassword = '';
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        hashedPassword = user.password.props.password;
      } else {
        hashedPassword = await user.password.getHashedValue();
      }
    }

    return {
      id: user.id.getId(),
      username: user.username.props.username,
      email: user.email.props.email,
      password: hashedPassword,
    };
  }
}
