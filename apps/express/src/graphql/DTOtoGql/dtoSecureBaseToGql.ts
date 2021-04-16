import { SecureBase } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';

export const secureBaseToGql = (secureBase: SecureBase): NexusGenFieldTypes['SecureBase'] => {
  const data = {
    id: secureBase.getId(),
    baseOwner: secureBase.getRoomOwner(),
    members: secureBase.getMembers() || null,
  };

  return data;
};
