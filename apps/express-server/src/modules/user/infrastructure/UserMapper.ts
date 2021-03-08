import { User as StoredUser } from '@prisma/client';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';

export class UserMapper {
  public static ToDomain(storedUser: StoredUser): User {
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
    if (!!user.getPassword() === true) {
      if (user.getPassword().isAlreadyHashed()) {
        hashedPassword = user.getPassword().value;
      } else {
        hashedPassword = await user.getPassword().getHashedValue();
      }
    }
    return {
      id: user.getId(),
      username: user.getUsername(),
      email: user.getEmail(),
      password: hashedPassword,
    };
  }
}
