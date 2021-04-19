import { DTOOrg } from '@kurakichi/domain';
import { idsMapper } from '../../util/idMapper';
import { NexusGenFieldTypes } from '../generated/nexus';

export const dtoOrgToGql = (dtoOrg: DTOOrg): NexusGenFieldTypes['Org'] => {
  const {
    adminId,
    avatar,
    description,
    email,
    homePage,
    id,
    image,
    inquiries,
    location,
    members,
    name,
    phoneNumber,
  } = dtoOrg;

  return {
    id,
    orgName: name,
    location,
    email,
    phoneNumber,
    description,
    homePage,
    avatar,
    image,
    members: idsMapper(members),
    inquiries: idsMapper(inquiries),
  };
};
