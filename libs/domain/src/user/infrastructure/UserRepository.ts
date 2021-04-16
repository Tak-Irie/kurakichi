import { PrismaClient } from '@prisma/client';
import { StoredUserRelation, UserMapper } from './UserMapper';
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

  // FIXME:separate getUser and getUserDetail that include infos
  async getUserByUserId(userId: UniqueEntityId): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({
      where: { id: userId.getId() },
      include: {
        receivedMessages: { select: { id: true } },
        belongOrgs: { select: { id: true } },
        belongSecureBases: { select: { id: true } },
      },
    });
    if (!result) return undefined;

    console.log('getUserByUserId:', result);
    return UserMapper.ToDomain(result as StoredUserRelation);
  }

  async registerUser(user: User): Promise<User | undefined> {
    const registeredEmail = await this.confirmExistence(user.props.email);

    if (registeredEmail === true) return undefined;

    const data = await UserMapper.toStore(user);

    await this.prisma.user.create({ data });

    return user;
  }

  async getUsers(): Promise<User[] | false> {
    const users = await this.prisma.user.findMany({
      include: {
        receivedMessages: { select: { id: true } },
        belongOrgs: { select: { id: true } },
        belongSecureBases: { select: { id: true } },
      },
    });

    if (users == undefined) return false;

    const data = users.map((user) => UserMapper.ToDomain(user as StoredUserRelation));

    return data;
  }

  async getUserByEmail(userEmail: UserEmail): Promise<User | undefined> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email: userEmail.getValue() },
      include: {
        receivedMessages: { select: { id: true } },
        belongOrgs: { select: { id: true } },
        belongSecureBases: { select: { id: true } },
      },
    });
    if (prismaUser === null) return undefined;

    const domainUser = UserMapper.ToDomain(prismaUser as StoredUserRelation);
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

  async updateUser(user: User): Promise<User | false> {
    const rawData = await UserMapper.toStore(user);
    const dbResult = await this.prisma.user.update({
      where: { id: rawData.id },
      data: rawData,
    });
    if (dbResult == undefined) return false;
    return user;
  }
}
