import { User } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';
import { messageToGql } from './messageToGql';
import { orgToGql } from './orgToGql';
import { secureBaseToGql } from './secureBaseToGql';

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

export const userToGql = (user: User): NexusGenFieldTypes['User'] => {
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

  if (belongOrgs) gqlOrgs = belongOrgs.map((org) => orgToGql(org));
  if (belongSecureBases)
    gqlSecureBases = belongSecureBases.map((secureBase) => secureBaseToGql(secureBase));
  if (messages) gqlMessages = messages.map((message) => messageToGql(message));

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
