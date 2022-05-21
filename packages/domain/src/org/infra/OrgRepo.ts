import { PrismaClient } from '@prisma/client';
import { UniqueEntityId } from '../../shared/domain';
import { IOrgRepo, Org } from '../domain';
import { OrgName } from '../domain/OrgName';
import { OrgReadModel } from '../tempRead/OrgReadModel';
import { OrgMapper } from './OrgMapper';

export class OrgRepo implements IOrgRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async confirmOrgByName(orgName: OrgName): Promise<boolean> {
    const name = orgName.getValue();
    const result = await this.prisma.organization.findUnique({
      where: { name },
    });
    return !!result;
  }

  async confirmMemberExistence(
    orgId: UniqueEntityId,
    memberId: UniqueEntityId,
  ): Promise<boolean> {
    // console.log('confirmMember:', orgId, memberId);
    const result = await this.prisma.organization.findUnique({
      where: { id: orgId.getId() },
      select: { members: { where: { id: memberId.getId() } } },
    });
    if (result == undefined) return false;
    return true;
  }

  async registerOrg(org: Org): Promise<Org | false> {
    const data = OrgMapper.toStore(org);
    // console.log('orgRepoRegisterData:', data);
    const result = await this.prisma.$transaction([
      this.prisma.organization.create({
        data,
      }),
      this.prisma.user.update({
        where: { id: data.adminId },
        data: { belongOrgs: { connect: { id: data.id } }, role: 'EXPERT' },
      }),
    ]);

    if (result == undefined) return false;
    return org;
  }

  async getOrgs(): Promise<Org[]> {
    console.log('catch:');
    const dbOrgs = await this.prisma.organization.findMany({
      include: {
        members: { select: { id: true } },
        inquiries: { select: { id: true } },
      },
    });
    // console.log('dbOrgs:', dbOrgs);

    // console.log('repoOrgs:', orgs);

    const domainOrgs = dbOrgs.map((org) => OrgMapper.ToDomain(org));
    // console.log('toDomOrgs:', toDomainOrgs);

    return domainOrgs;
  }

  async getOrgsByMemberId(memberId: UniqueEntityId): Promise<Org[] | false> {
    const dbOrgs = await this.prisma.organization.findMany({
      where: { members: { some: { id: memberId.getId() } } },
      include: { members: true, inquiries: true },
    });
    if (dbOrgs == undefined) return false;

    const domainOrgs = OrgMapper.ArrayToDomain(dbOrgs);
    return domainOrgs;
  }

  async getOrgById(orgId: UniqueEntityId): Promise<Org | false> {
    const orgResult = await this.prisma.organization.findUnique({
      where: { id: orgId.getId() },
      include: {
        members: { select: { id: true } },
        inquiries: { select: { id: true } },
      },
    });
    if (orgResult == undefined) return false;

    const domainOrg = OrgMapper.ToDomain(orgResult);
    return domainOrg;
  }

  async acceptJoinOrg(
    orgId: UniqueEntityId,
    MemberId: UniqueEntityId,
  ): Promise<Org | false> {
    const userId = MemberId.getId();
    const _orgId = orgId.getId();

    // TODO: does any better solution?
    const result = await this.prisma.$transaction([
      this.prisma.organization.update({
        where: { id: _orgId },
        data: {
          members: {
            connect: { id: userId },
            update: { where: { id: userId }, data: { role: 'EXPERT' } },
          },
        },
      }),
      // this.prisma.organization.delete({
      //   where: { id: _orgId },
      //   select: { requestedMembers: { where: { id: userId } } },
      // }),
    ]);
    if (result == undefined) return false;

    const domainOrg = OrgMapper.ToDomain(result[0]);
    return domainOrg;
  }

  async requestJoinOrg(
    reqId: UniqueEntityId,
    orgId: UniqueEntityId,
  ): Promise<Org | false> {
    const result = await this.prisma.organization.update({
      where: { id: orgId.getId() },
      data: { requestedMembers: { connect: { id: reqId.getId() } } },
    });
    if (result == undefined) return false;

    const data = OrgMapper.ToDomain(result);
    return data;
  }

  async updateOrg(org: Org): Promise<Org> {
    try {
      const primitiveOrg = OrgMapper.toStore(org);

      const result = await this.prisma.organization.update({
        where: { id: primitiveOrg.id },
        data: primitiveOrg,
      });
      return OrgMapper.ToDomain(result);
    } catch (err) {
      console.error(err);
      throw Error('データベースエラー');
    }
  }

  async getOrgPublicInfoTemp(orgId: string): Promise<OrgReadModel | false> {
    const data = await this.prisma.organization.findUnique({
      where: { id: orgId },
      include: { members: true },
    });
    if (data === null) return false;
    return data;
  }
  async getOrgPrivateInfoTemp(orgId: string, memberId: string) {
    const data = await this.prisma.organization.findFirst({
      where: { id: orgId, members: { some: { id: memberId } } },
      include: {
        inquiries: { include: { sender: true, receiver: true } },
        members: true,
      },
    });
    if (!data) return false;
    return data;
  }
}
