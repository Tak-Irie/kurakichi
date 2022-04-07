import { DTOUser } from '@kurakichi/domain';
import { idsMapper } from '../../util/idMapper';
import { NexusGenFieldTypes } from '../generated/nexus';

export const dtoUserToGql = (user: DTOUser): NexusGenFieldTypes['User'] => {
  const {
    avatar,
    belongOrgs,
    belongSecureBases,
    description,
    email,
    id,
    image,
    messages,
    role,
    userName,
  } = user;
  return {
    avatar,
    belongOrgs: idsMapper(belongOrgs),
    belongSecureBases: idsMapper(belongSecureBases),
    description,
    email,
    id,
    image,
    messages: idsMapper(messages),
    role,
    userName,
  };
};

export const dtoUsersToGql = (users: DTOUser[]): NexusGenFieldTypes['User'][] => {
  return users.map((user) => dtoUserToGql(user));
};
