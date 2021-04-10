import { DialogRoom } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';

export const dialogRoomToPresentation = (
  dialogRoom: DialogRoom,
): NexusGenFieldTypes['DialogRoom'] => {
  const data = {
    id: dialogRoom.getId(),
    roomOwner: dialogRoom.getRoomOwner(),
    members: dialogRoom.getMembers() || null,
  };

  return data;
};
