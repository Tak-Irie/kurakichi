import { Org } from '@kurakichi/domain';
import { NexusGenObjects } from '../generated/nexus';

export const orgToPresentation = (org: Org): NexusGenObjects['Org'] => {
  const data = {
    id: org.getId(),
    name: org.getOrgName(),
    location: org.getOrgLocation(),
  };
  return data;
};
