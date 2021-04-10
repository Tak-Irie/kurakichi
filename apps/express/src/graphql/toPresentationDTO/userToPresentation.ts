import { User } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';
import { messageToPresentation } from './messageToPresentation';
import { orgToPresentation } from './orgToPresentation';
import { secureBaseToPresentation } from './secureBaseToPresentation';

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
    belongSecureBases,
    messages,
    picture,
    role,
  } = user.getProps();

  let gqlOrgs: NexusGenFieldTypes['Org'][] | undefined;
  let gqlSecureBases: NexusGenFieldTypes['SecureBase'][] | undefined;
  let gqlMessages: NexusGenFieldTypes['Message'][] | undefined;
  // console.log('userToPresent:', user);

  if (belongOrgs) gqlOrgs = belongOrgs.map((org) => orgToPresentation(org));
  if (belongSecureBases)
    gqlSecureBases = belongSecureBases.map((secureBase) => secureBaseToPresentation(secureBase));
  if (messages) gqlMessages = messages.map((message) => messageToPresentation(message));

  const data = {
    id: id.getId(),
    email: email.getValue(),
    userName: userName.getValue(),
    role,
    picture,
    belongOrgs: gqlOrgs,
    belongSecureBases: gqlSecureBases,
    messages: gqlMessages,
  };
  return data;
};
