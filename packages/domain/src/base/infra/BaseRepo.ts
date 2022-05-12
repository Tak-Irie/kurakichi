import { PrismaClient } from '@prisma/client';
import { UniqueEntityId } from '../../shared/domain';
import { Base } from '../domain/Base';
import { IBaseRepo } from '../domain/IBaseRepo';
import { BaseMapper } from './BaseMapper';

export class BaseRepo implements IBaseRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getBase(baseId: UniqueEntityId): Promise<Base | false> {
    const dbResult = await this.prisma.base.findUnique({
      where: { id: baseId.getId() },
      include: { fellows: true, dialog: true, karte: true },
    });
    if (dbResult == undefined) return false;
    return BaseMapper.ToDomain(dbResult);
  }

  async registerBase(base: Base): Promise<Base | false> {
    const baseId = base.getId();
    const adminId = base.getBaseOwner().getId();
    const dbResult = await this.prisma.$transaction([
      this.prisma.base.create({
        data: {
          id: baseId,
          admin: { connect: { id: adminId } },
        },
      }),
      this.prisma.user.update({
        where: { id: adminId },
        data: { belongBases: { connect: { id: baseId } } },
      }),
    ]);

    if (dbResult == undefined) return false;

    return base;
  }
}
