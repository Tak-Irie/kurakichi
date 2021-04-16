import { DTOUser } from '@kurakichi/domain';
import { idMapper } from '../../util/idMapper';
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
    belongOrgs: idMapper(belongOrgs),
    belongSecureBases: idMapper(belongSecureBases),
    description,
    email,
    id,
    image,
    messages: idMapper(messages),
    role,
    userName,
  };
};
