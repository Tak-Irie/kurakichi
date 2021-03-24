import { PrismaClient } from '@prisma/client';
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
    return org;
  }
}
