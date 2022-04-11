import { Base as StoredBase, User as StoredUser } from "@prisma/client";
import { UniqueEntityId } from "../../shared/domain";
import { Base } from "../domain";

type BaseRelations = StoredBase & {
  members: StoredUser[];
};

export class BaseMapper {
  public static ToDomain(storedBase: BaseRelations): Base {
    const domainRoom = Base.create({
      id: UniqueEntityId.restoreFromRepo({ id: storedBase.id }),
      baseOwner: UniqueEntityId.restoreFromRepo({ id: storedBase.adminId }),
      members: storedBase.members.map((member) =>
        UniqueEntityId.restoreFromRepo({ id: member.id })
      ),
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
