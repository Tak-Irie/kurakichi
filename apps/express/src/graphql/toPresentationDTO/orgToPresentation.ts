import { Org } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';

type MemberDTO = {
  id: string;
  email: string;
  userName: string;
};

export const orgToPresentation = (org: Org): NexusGenFieldTypes['Org'] => {
  const members: MemberDTO[] = org.getMembers().map((member) => {
    return {
      id: member.getId(),
      email: member.getEmail(),
      userName: member.getMemberName(),
    };
  });

  const props = org.getProps();

  const data = {
    id: org.getId(),
    orgName: org.getOrgName(),
    location: org.getOrgLocation(),
    email: org.getEmail(),
    phoneNumber: props.phoneNumber.getValue(),
    description: 'UNKNOWN',
    homePage: 'UNKNOWN',
    icon: props.icon,
    image: 'UNKNOWN',
    members,
  };

  return data;
};
