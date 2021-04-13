import { PrismaClient } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { IOrgRepo, Org } from '../domain';
import { OrgName } from '../domain/OrgName';
import { OrgMapper } from './OrgMapper';

export class OrgRepo implements IOrgRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getOrgByName(orgName: OrgName): Promise<boolean> {
    const name = orgName.getValue();
    const result = await this.prisma.organization.findUnique({ where: { name } });
    return !!result;
  }

  async registerOrg(org: Org): Promise<Org | undefined> {
    const existed = await this.getOrgByName(org.props.name);
    if (existed === true) return undefined;

    const data = await OrgMapper.toStore(org);
    const result = await this.prisma.$transaction([
      this.prisma.organization.create({
        data,
      }),
      this.prisma.user.update({
        where: { id: data.adminId },
        data: { belongOrgs: { connect: { id: data.id } }, role: 'PRO' },
      }),
    ]);

    if (result == undefined) return undefined;
    return org;
  }

  async getOrgs(): Promise<Org[]> {
    const orgs = await this.prisma.organization.findMany({ include: { members: true } });
    // console.log('repoOrgs:', orgs);

    const toDomainOrgs = orgs.map((org) => OrgMapper.ToDomain(org));
    // console.log('toDomOrgs:', toDomainOrgs);

    return toDomainOrgs;
  }

  async getOrgById(orgId: UniqueEntityId): Promise<Org | undefined> {
    const orgResult = await this.prisma.organization.findUnique({
      where: { id: orgId.getId() },
      include: { members: true },
    });
    if (orgResult == undefined) return undefined;

    const data = OrgMapper.ToDomain(orgResult);
    return data;
  }

  async acceptJoinOrg(orgId: UniqueEntityId, MemberId: UniqueEntityId): Promise<boolean> {
    const userId = MemberId.getId();
    const _orgId = orgId.getId();

    // TODO: does any better solution?
    const result = await this.prisma.$transaction([
      this.prisma.organization.update({
        where: { id: _orgId },
        data: {
          members: {
            connect: { id: userId },
            update: { where: { id: userId }, data: { role: 'PRO' } },
          },
        },
      }),
      this.prisma.organization.delete({
        where: { id: _orgId },
        select: { requestedMembers: { where: { id: userId } } },
      }),
    ]);

    if (result == undefined) return false;
    return true;
  }

  async requestJoinOrg(reqId: UniqueEntityId, orgId: UniqueEntityId): Promise<Org | false> {
    const result = await this.prisma.organization.update({
      where: { id: orgId.getId() },
      data: { requestedMembers: { connect: { id: reqId.getId() } } },
      include: { members: true },
    });
    if (result == undefined) return false;

    const data = OrgMapper.ToDomain(result);
    return data;
  }
}
