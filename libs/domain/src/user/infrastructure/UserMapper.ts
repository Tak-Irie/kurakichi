import { User as StoredUser } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { User, UserEmail, UserName, UserPassword } from '../domain';

export class UserMapper {
  public static async ToDomain(storedUser: StoredUser): Promise<User> {
    let password: UserPassword | undefined;
    const userNameResult = UserName.create({ username: storedUser.name });

    if (storedUser.password) {
      const result = await UserPassword.create({
        password: storedUser.password,
        isHashed: true,
      });
      password = result.getValue();
    }

    const userEmailResult = UserEmail.create({ email: storedUser.email });

    const userResult = new User({
      id: new UniqueEntityId(storedUser.id),
      username: userNameResult.getValue(),
      password,
      email: userEmailResult.getValue(),
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
    };
  }
}
