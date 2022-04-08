import { DTOOrg, DTOUser } from "@kurakichi/domain";
import { idsMapper } from "../../util/idMapper";
import { NexusGenFieldTypes } from "../generated/nexus";

export const dtoOrgToGql = (dtoOrg: DTOOrg): NexusGenFieldTypes["Org"] => {
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
    latitude,
    longitude,
    members,
    name,
    phoneNumber,
  } = dtoOrg;

  return {
    id,
    orgName: name,
    location,
    latitude,
    longitude,
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
export const dtoOrgsToGql = (
  dtoOrgs: DTOOrg[]
): NexusGenFieldTypes["Org"][] => {
  return dtoOrgs.map((org) => dtoOrgToGql(org));
};

// TODO:these function is used still impl CQRS
export const dtoOrgToGqlWithUser = (
  dtoOrg: DTOOrg,
  dtoUser: DTOUser[]
): NexusGenFieldTypes["Org"] => {
  const org = dtoOrgToGql(dtoOrg);
  const members = org.members.map((member) => {
    const user = dtoUser.find((user) => user.id === member.id);
    const _user = { ...user, belongOrgs: [], messages: [], belongBases: [] };
    return _user;
  });
  return { ...org, members: members };
};

export const dtoOrgsToGqlWithUser = (
  dtoOrgs: DTOOrg[],
  dtoUser: DTOUser[]
): NexusGenFieldTypes["Org"][] => {
  const orgs = dtoOrgs.map((org) => dtoOrgToGqlWithUser(org, dtoUser));
  return orgs;
};
