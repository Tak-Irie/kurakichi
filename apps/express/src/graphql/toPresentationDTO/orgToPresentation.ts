import { Org } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';

export const orgToPresentation = (org: Org): NexusGenFieldTypes['Org'] => {
  const members: NexusGenFieldTypes['User'][] = org.getMembers().map((member) => {
    return {
      id: member.getId(),
      email: member.getEmail(),
      userName: member.getMemberName(),
    };
  });

  const data = {
    id: org.getId(),
    orgName: org.getOrgName(),
    location: org.getOrgLocation(),
    members,
  };

  return data;
};
