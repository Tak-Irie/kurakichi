import { PrismaClient } from "@prisma/client";
import { UniqueEntityId } from "../../shared/domain";
import { Base } from "../domain/Base";
import { IBaseRepo } from "../domain/IBaseRepo";
import { SecureBaseMapper } from "./BaseMapper";

export class BaseRepo implements IBaseRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getSecureBase(baseId: UniqueEntityId): Promise<Base | false> {
    const dbResult = await this.prisma.secureBase.findUnique({
      where: { id: baseId.getId() },
      include: { members: true },
    });
    if (dbResult == undefined) return false;
    return SecureBaseMapper.ToDomain(dbResult);
  }
  async registerSecureBase(secureBase: Base): Promise<Base | false> {
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
