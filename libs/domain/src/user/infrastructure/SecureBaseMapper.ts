import { SecureBase as StoredSecureBase, User as StoredUser } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { SecureBase } from '../domain';

type SecureBaseRelations = StoredSecureBase & {
  members?: StoredUser[];
};

export class SecureBaseMapper {
  public static ToDomain(storedRoom: SecureBaseRelations): SecureBase {
    const domainRoom = SecureBase.create({
      id: UniqueEntityId.reconstruct(storedRoom.id).getValue(),
      baseOwner: UniqueEntityId.reconstruct(storedRoom.adminId).getValue(),
      members: storedRoom.members.map((member) => UniqueEntityId.reconstruct(member.id).getValue()),
    });

    return domainRoom.getValue();
  }
  // public static async toStore(
  //   domainMessage: SecureBase,
  // ): Promise<Omit<StoredSecureBase, 'createdAt' | 'read_flag'>> {
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
