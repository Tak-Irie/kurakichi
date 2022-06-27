import { PrismaClient } from '@prisma/client';
import { prisma } from '../../shared';
import { UniqueEntityId } from '../../shared/domain';
import { IUserRepository, User, UserEmail, UserPassword } from '../domain';
import { UserReadModel } from '../tempRead/UserReadModel';
import { StoredUserRelation, UserMapper } from './UserMapper';

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
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
        belongBases: { select: { id: true } },
      },
    });
    if (!result) return undefined;

    // console.log('getUserByUserId:', result);
    return UserMapper.ToDomain(result as StoredUserRelation);
  }

  async getUsersByIds(userIds: UniqueEntityId[]): Promise<User[] | false> {
    const rawIds = userIds.map((id) => id.getId());
    const result = await this.prisma.user.findMany({
      where: { id: { in: rawIds } },
    });
    if (result == undefined) return false;
    return UserMapper.arrayToDomain(result);
  }

  async getUserBySSOSub(userSSOSub: string): Promise<User | false> {
    const result = await this.prisma.user.findFirst({
      where: { ssoSub: userSSOSub },
      include: {
        receivedMessages: { select: { id: true } },
        belongOrgs: { select: { id: true } },
        belongBases: { select: { id: true } },
      },
    });
    if (!result) return false;

    return UserMapper.ToDomain(result);
  }

  async getUsersByOrgId(orgId: UniqueEntityId): Promise<User[] | false> {
    const dbResult = await this.prisma.user.findMany({
      where: { belongOrgs: { some: { id: orgId.getId() } } },
    });
    // console.log('dbResult:', dbResult);
    if (dbResult == undefined) return false;

    const domainUsers = UserMapper.arrayToDomain(dbResult);
    // console.log('domainUsers:', domainUsers);
    return domainUsers;
  }

  async registerUser(user: User): Promise<User | undefined> {
    const registeredEmail = await this.confirmExistence(user.props.email);

    if (registeredEmail === true) return undefined;

    const data = UserMapper.toStore(user);

    await this.prisma.user.create({ data });

    return user;
  }

  async getUsers(): Promise<User[] | false> {
    const users = await this.prisma.user.findMany({
      include: {
        receivedMessages: { select: { id: true } },
        belongOrgs: { select: { id: true } },
        belongBases: { select: { id: true } },
      },
    });

    if (users == undefined) return false;

    // console.log('users:', users);
    const data = users.map((user) =>
      UserMapper.ToDomain(user as StoredUserRelation),
    );

    return data;
  }

  async getUserByEmail(userEmail: UserEmail): Promise<User | undefined> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email: userEmail.getValue() },
      include: {
        receivedMessages: { select: { id: true } },
        belongOrgs: { select: { id: true } },
        belongBases: { select: { id: true } },
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

  async changeUserPassword(
    userId: UniqueEntityId,
    password: UserPassword,
  ): Promise<boolean> {
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
    const rawData = UserMapper.toStore(user);
    const dbResult = await this.prisma.user.update({
      where: { id: rawData.id },
      data: rawData,
    });
    if (dbResult == undefined) return false;
    return user;
  }

  async getUserMyInfoTemp(userId: string): Promise<false | UserReadModel> {
    const data = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { receivedMessages: true },
    });
    if (!data) return false;
    return { sentMessages: [], belongOrgs: [], ...data };
  }
  async getUserByIdTemp(userId: string): Promise<false | UserReadModel> {
    const data = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { belongOrgs: { select: { id: true, name: true } } },
    });
    if (!data) return false;
    return { sentMessages: [], receivedMessages: [], ...data };
  }

  async getSentInquiryByUserIdTemp(
    userId: string,
  ): Promise<false | UserReadModel> {
    const data = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { sentInquiries: true },
    });
    if (!data) return false;

    return { ...data };
  }
}
