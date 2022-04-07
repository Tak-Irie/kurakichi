import { PrismaClient } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { SecureBase, ISecureBaseRepo } from '../domain';
import { SecureBaseMapper } from './SecureBaseMapper';

export class SecureBaseRepo implements ISecureBaseRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getSecureBase(baseId: UniqueEntityId): Promise<SecureBase | false> {
    const dbResult = await this.prisma.secureBase.findUnique({
      where: { id: baseId.getId() },
      include: { members: true },
    });
    if (dbResult == undefined) return false;
    return SecureBaseMapper.ToDomain(dbResult);
  }
  async registerSecureBase(secureBase: SecureBase): Promise<SecureBase | false> {
    const baseId = secureBase.getId();
    const adminId = secureBase.getRoomOwner().getId();
    const dbResult = await this.prisma.$transaction([
      this.prisma.secureBase.create({
        data: {
          id: baseId,
          admin: { connect: { id: adminId } },
        },
      }),
      this.prisma.user.update({
        where: { id: adminId },
        data: { belongSecureBases: { connect: { id: baseId } } },
      }),
    ]);

    if (dbResult == undefined) return false;

    return secureBase;
  }
}
