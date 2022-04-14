import {
  Base as StoredBase,
  Dialog,
  Karte,
  User as StoredUser,
} from '@prisma/client';
import { UniqueEntityId } from '../../shared/domain';
import { Base } from '../domain';

type BaseRelations = StoredBase & {
  fellows: StoredUser[];
  dialog: Dialog | null;
  karte: Karte | null;
};

export class BaseMapper {
  public static ToDomain(storedBase: BaseRelations): Base {
    const domainRoom = Base.create({
      id: UniqueEntityId.restoreFromRepo({ id: storedBase.id }),
      baseOwner: UniqueEntityId.restoreFromRepo({ id: storedBase.adminId }),
      fellows: storedBase.fellows.map((member) =>
        UniqueEntityId.restoreFromRepo({ id: member.id }),
      ),
      dialogs: '',
      karte: '',
    });

    return domainRoom.getValue();
  }
  // public static async toStore(
  //   domainMessage: SecureBase,
  // ): Promise<Omit<StoredBase, 'createdAt' | 'read_flag'>> {
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
