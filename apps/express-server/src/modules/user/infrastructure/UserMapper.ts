import { StoredUser } from '../../../graphql/entities/StoredUser';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';

export class UserMapper {
  public static toDomain(ormUser: StoredUser): User {
    const userNameResult = UserName.create({ username: ormUser.username });
    const userPasswordResult = UserPassword.create({
      password: ormUser.password,
      isHashed: true,
    });
    const userEmailResult = UserEmail.create({ email: ormUser.email });

    const userResult = new User({
      id: new UniqueEntityId(ormUser.id),
      username: userNameResult.getValue(),
      password: userPasswordResult.getValue(),
      email: userEmailResult.getValue(),
    });

    return userResult;
  }

  public static async toTypeOrm(
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
