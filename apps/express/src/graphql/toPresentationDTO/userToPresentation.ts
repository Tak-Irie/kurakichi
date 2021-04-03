import { User } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';

export const userToPresentation = (user: User): NexusGenFieldTypes['User'] => {
  const data = {
    id: user.getId(),
    email: user.getEmail(),
    userName: user.getUsername(),
  };
  return data;
};
