import { Org } from '@kurakichi/domain';
import { NexusGenFieldTypes, NexusGenObjects } from '../generated/nexus';

export const orgToPresentation = (org: Org): NexusGenFieldTypes['Org'] => {
  const data = {
    id: org.getId(),
    orgName: org.getOrgName(),
    location: org.getOrgLocation(),
    member: [],
  };
  return data;
};
