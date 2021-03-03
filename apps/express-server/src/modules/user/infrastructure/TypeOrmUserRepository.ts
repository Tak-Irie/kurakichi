import { EntityRepository, Repository } from 'typeorm';
import { IUserRepository } from '../domain/IUserRepository';
import { StoredUser } from '../../../graphql/entities/StoredUser';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserMapper } from './UserMapper';

@EntityRepository(StoredUser)
export class TypeOrmUserRepository
  extends Repository<StoredUser>
  implements IUserRepository {
  async confirmExistence(userEmail: UserEmail): Promise<boolean> {
    const { email } = userEmail.props;
    console.log(':', email);
    const result = await this.manager.findOne(StoredUser, { email });
    console.log(':', result);

    return !!result;
  }

  async getUserByUserId(userId: string): Promise<StoredUser | undefined> {
    const result = await this.manager.findOne(StoredUser, userId);
    if (!result) return undefined;

    return result;
  }

  async registerUser(user: User): Promise<void> {
    const confirmExistence = await this.confirmExistence(user.email);
    if (!confirmExistence) {
      const data = await UserMapper.toTypeOrm(user);
      await this.manager.save(StoredUser, {
        ...data,
      });
    }
  }

  async getUsers(): Promise<StoredUser[] | undefined> {
    const users = await this.manager.find(StoredUser);

    return users || undefined;
  }
}
