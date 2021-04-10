import { PrismaClient } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { DialogRoom, IDialogRoomRepo } from '../domain';
import { DialogRoomMapper } from './DialogRoomMapper';

export class DialogRoomRepo implements IDialogRoomRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getDialogRoom(roomId: UniqueEntityId): Promise<DialogRoom | false> {
    const dbResult = await this.prisma.dialogRoom.findUnique({
      where: { id: roomId.getId() },
      include: { members: true },
    });
    if (dbResult == undefined) return false;
    return DialogRoomMapper.ToDomain(dbResult);
  }
  async registerDialogRoom(dialogRoom: DialogRoom): Promise<DialogRoom | false> {
    const roomId = dialogRoom.getId();
    const adminId = dialogRoom.getRoomOwner().getId();
    const dbResult = await this.prisma.$transaction([
      this.prisma.dialogRoom.create({
        data: {
          id: roomId,
          admin: { connect: { id: adminId } },
        },
      }),
      this.prisma.user.update({
        where: { id: adminId },
        data: { belongRooms: { connect: { id: roomId } } },
      }),
    ]);

    if (dbResult == undefined) return false;

    return dialogRoom;
  }
}
