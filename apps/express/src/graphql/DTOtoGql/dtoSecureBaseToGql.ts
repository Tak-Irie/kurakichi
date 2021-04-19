import { DTOSecureBase } from '@kurakichi/domain';
import { idMapper, idsMapper } from '../../util/idMapper';
import { NexusGenFieldTypes } from '../generated/nexus';

export const secureBaseToGql = (secureBase: DTOSecureBase): NexusGenFieldTypes['SecureBase'] => {
  const { baseOwner, id, members } = secureBase;
  return {
    id,
    baseOwner: idMapper(baseOwner),
    members: idsMapper(members),
  };
};
