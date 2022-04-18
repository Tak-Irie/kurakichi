import { Org } from '../domain';

export type DTOOrg = {
  id: string;
  adminId: string;
  avatarUrl: string;
  description: string;
  email: string;
  homePageUrl: string;
  heroImageUrl: string;
  inquiries: string[];
  address: string;
  latitude: number;
  longitude: number;
  members: string[];
  name: string;
  phoneNumber: string;
};

// export type DAOOrg = Omit<DTOOrg, 'inquiries' | 'members'> & {
//   members: DTOUser[];
//   inquiries: DTOInquiry[];
// };

export const createDTOOrgFromDomain = (org: Org): DTOOrg => {
  const {
    id,
    adminId,
    avatarUrl,
    description,
    email,
    homePageUrl,
    heroImageUrl,
    inquiries,
    address,
    latitude,
    longitude,
    members,
    name,
    phoneNumber,
  } = org.getProps();
  return {
    id: id.getId(),
    adminId: adminId.getId(),
    avatarUrl: avatarUrl ? avatarUrl.getURL() : '',
    description: description ? description.getContent() : '',
    email: email.getValue(),
    homePageUrl: homePageUrl ? homePageUrl.getURL() : '',
    heroImageUrl: heroImageUrl ? heroImageUrl.getURL() : '',
    inquiries: inquiries.map((inquiry) => inquiry.getId()),
    address: address.getValue(),
    latitude: latitude.getValue(),
    longitude: longitude.getValue(),
    members: members.map((member) => member.getId()),
    name: name.getValue(),
    phoneNumber: phoneNumber.getValue(),
  };
};

export const createDTOOrgsFromDomain = (orgs: Org[]): DTOOrg[] => {
  const dtoOrgs = orgs.map((org) => createDTOOrgFromDomain(org));
  return dtoOrgs;
};
