import { User } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';
import { messageToPresentation } from './messageToPresentation';
import { orgToPresentation } from './orgToPresentation';
import { dialogRoomToPresentation } from './dialogRoomToPresentation';

// export type UserDTO = {
//   id: string;
//   email: string;
//   userName: string;
//   role: 'USER' | 'PRO';
//   picture: string;
//   belongOrgs: IDs;
//   belongRooms: IDs;
//   messages: IDs;
// };

export const userToPresentation = (user: User): NexusGenFieldTypes['User'] => {
  const {
    id,
    email,
    userName,
    belongOrgs,
    belongDialogRooms,
    messages,
    picture,
    role,
  } = user.getProps();

  let gqlOrgs: NexusGenFieldTypes['Org'][] | undefined;
  let gqlDialogRooms: NexusGenFieldTypes['DialogRoom'][] | undefined;
  let gqlMessages: NexusGenFieldTypes['Message'][] | undefined;
  // console.log('userToPresent:', user);

  if (belongOrgs) gqlOrgs = belongOrgs.map((org) => orgToPresentation(org));
  if (belongDialogRooms)
    gqlDialogRooms = belongDialogRooms.map((dialogRoom) => dialogRoomToPresentation(dialogRoom));
  if (messages) gqlMessages = messages.map((message) => messageToPresentation(message));

  const data = {
    id: id.getId(),
    email: email.getValue(),
    userName: userName.getValue(),
    role,
    picture,
    belongOrgs: gqlOrgs,
    belongDialogRooms: gqlDialogRooms,
    messages: gqlMessages,
  };
  return data;
};
