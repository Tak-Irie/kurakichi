import { DialogRoom as StoredDialogRoom, User as StoredUser } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { DialogRoom } from '../domain';

type DialogRoomRelations = StoredDialogRoom & {
  members?: StoredUser[];
};

export class DialogRoomMapper {
  public static ToDomain(storedRoom: DialogRoomRelations): DialogRoom {
    const domainRoom = DialogRoom.create({
      id: new UniqueEntityId(storedRoom.id),
      roomOwner: new UniqueEntityId(storedRoom.adminId),
      members: storedRoom.members.map((member) => new UniqueEntityId(member.id)),
    });

    return domainRoom.getValue();
  }
  // public static async toStore(
  //   domainMessage: DialogRoom,
  // ): Promise<Omit<StoredDialogRoom, 'createdAt' | 'read_flag'>> {
  //   const props = domainMessage.getProps();
  //   const rawData = {
  //     id: props.id.getId(),
  //     text: props.content.getText(),
  //     senderId: props.sender.getId(),
  //     receiverId: props.receiver.getId(),
  //   };

  //   return rawData;
  // }
}
