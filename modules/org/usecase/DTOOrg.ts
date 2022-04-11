import { Org } from "../domain";

export type DTOOrg = {
  id: string;
  adminId: string;
  avatar: string;
  description: string;
  email: string;
  homePage: string;
  image: string;
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
    avatar,
    description,
    email,
    homePage,
    image,
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
    avatar: avatar ? avatar.getURL() : "",
    description: description ? description.getContent() : "",
    email: email.getValue(),
    homePage: homePage ? homePage.getURL() : "",
    image: image ? image.getURL() : "",
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
