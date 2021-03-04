import { PrismaClient, User as StoredUser } from '@prisma/client';
import { IUserRepository } from '../domain/IUserRepository';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserMapper } from './UserMapper';

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async confirmExistence(userEmail: UserEmail): Promise<boolean> {
    const { email } = userEmail.props;
    console.log(':', email);
    const result = await this.prisma.user.findUnique({ where: { email } });

    return !!result;
  }

  async getUserByUserId(userId: string): Promise<StoredUser | null> {
    const result = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!result) return null;

    return result;
  }

  async registerUser(user: User): Promise<boolean> {
    const confirmExistence = await this.confirmExistence(user.email);

    if (!confirmExistence) return false;

    const data = await UserMapper.toStore(user);
    await this.prisma.user.create({ data });

    return true;
  }

  async getUsers(): Promise<StoredUser[] | undefined[]> {
    const users = await this.prisma.user.findMany();

    return users || undefined;
  }
}
