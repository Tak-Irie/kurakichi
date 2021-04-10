import { PrismaClient } from '@prisma/client';
import { UserMapper } from './UserMapper';
import { IUserRepository, User, UserEmail, UserPassword } from '../domain';
import { UniqueEntityId } from '../../shared';

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async confirmExistence(userEmail: UserEmail): Promise<boolean> {
    const email = userEmail.getValue();
    const result = await this.prisma.user.findUnique({ where: { email } });
    return !!result;
  }

  async getUserByUserId(userId: UniqueEntityId): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({
      where: { id: userId.getId() },
      include: { receivedMessages: true, belongOrgs: true, belongRooms: true },
    });
    if (!result) return undefined;

    // console.log('getUserByUserId:', result);
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
    const users = await this.prisma.user.findMany({
      include: { belongOrgs: true, belongRooms: true, receivedMessages: true },
    });

    const data = await Promise.all(users.map(async (user) => await UserMapper.ToDomain(user)));

    return data || null;
  }

  async getUserByEmail(userEmail: UserEmail): Promise<User | undefined> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email: userEmail.getValue() },
      include: { belongOrgs: true, belongRooms: true, receivedMessages: true },
    });
    if (prismaUser === null) return undefined;

    const domainUser = await UserMapper.ToDomain(prismaUser);
    return domainUser;
  }

  async deleteUser(userId: UniqueEntityId): Promise<boolean> {
    const result = await this.prisma.user.delete({
      where: { id: userId.getId() },
    });
    if (result === undefined) return false;
    return true;
  }

  async changeUserPassword(userId: UniqueEntityId, password: UserPassword): Promise<boolean> {
    const result = await this.prisma.user.update({
      where: { id: userId.getId() },
      data: {
        password: password.getValue(),
      },
    });
    if (result == undefined) return false;
    return true;
  }
}
