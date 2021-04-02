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

  async confirmExistence(orgName: OrgName): Promise<boolean> {
    const name = orgName.getValue();
    const result = await this.prisma.organization.findUnique({ where: { name } });
    return !!result;
  }

  async registerOrg(org: Org): Promise<Org | undefined> {
    const existed = await this.confirmExistence(org.props.name);
    if (existed === true) return undefined;

    const data = await OrgMapper.toStore(org);
    const result = await this.prisma.organization.create({ data });
    if (result == undefined) return undefined;
    return org;
  }

  async getOrgs(): Promise<Org[]> {
    const orgs = await this.prisma.organization.findMany({ include: { members: true } });
    console.log('repoOrgs:', orgs);

    const toDomainOrgs = await Promise.all(
      orgs.map(async (org) => await OrgMapper.ToDomain({ org })),
    );
    console.log('toDomOrgs:', toDomainOrgs);

    return toDomainOrgs;
  }

  async getOrgById(orgId: UniqueEntityId): Promise<Org | undefined> {
    const orgResult = await this.prisma.organization.findUnique({
      where: { id: orgId.getId() },
      include: { members: true },
    });
    if (orgResult == undefined) return undefined;

    const data = await OrgMapper.ToDomain({ org: orgResult });
    return data;
  }

  async registerMember(orgId: UniqueEntityId, MemberId: UniqueEntityId): Promise<boolean> {
    const userId = MemberId.getId();
    const result = await this.prisma.organization.update({
      where: { id: orgId.getId() },
      data: {
        members: {
          connect: { id: userId },
          update: { where: { id: userId }, data: { role: 'PRO' } },
        },
      },
    });

    if (result == undefined) return false;
    return true;
  }
}
