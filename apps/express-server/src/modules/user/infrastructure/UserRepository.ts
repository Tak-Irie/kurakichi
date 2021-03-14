import { PrismaClient } from '@prisma/client';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
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
    const result = await this.prisma.user.findUnique({ where: { email } });
    return !!result;
  }

  async getUserByUserId(userId: string): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!result) return undefined;

    return UserMapper.ToDomain(result);
  }

  async registerUser(user: User): Promise<User | undefined> {
    const registeredEmail = await this.confirmExistence(user.props.email);

    if (registeredEmail === true) return undefined;

    const data = await UserMapper.toStore(user);

    await this.prisma.user.create({ data });

    return user;
  }

  async getUsers(): Promise<User[] | undefined> {
    const users = await this.prisma.user.findMany();

    const data = users.map((user) => UserMapper.ToDomain(user));

    return data || null;
  }

  async getUserByEmail(userEmail: UserEmail): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail.value },
    });
    if (user === null) return undefined;

    const data = UserMapper.ToDomain(user);
    return data;
  }

  async deleteUser(userId: UniqueEntityId): Promise<boolean> {
    const result = await this.prisma.user.delete({
      where: { id: userId.getId() },
    });
    if (result === undefined) return false;
    return true;
  }
}
