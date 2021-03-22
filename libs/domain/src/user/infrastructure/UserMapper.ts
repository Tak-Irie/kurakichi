import { User as StoredUser } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { User, UserEmail, UserName, UserPassword } from '../domain';

export class UserMapper {
  public static async ToDomain(storedUser: StoredUser): Promise<User> {
    let password: UserPassword | undefined;
    const userNameResult = UserName.create({ username: storedUser.username });

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
    const result = () => {
      const data = user.getPassword();
      if (data === undefined) {
        return null;
      }
      return data;
    };

    return {
      id: user.getId(),
      username: user.getUsername(),
      email: user.getEmail(),
      password: result(),
      ssoSub: user.props.ssoSub || null,
      picture: user.props.picture || null,
    };
  }
}
