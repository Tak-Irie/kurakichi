import { DTOOrg, OrgReadModel } from '@kurakichi/domain';
import { Address, MemberConnection, Org } from '../generated/generatedTypes';
import { createGqlConn } from './createConnection';

export const dtoOrgToGql = (dtoOrg: DTOOrg): Org => {
  const {
    id,
    adminId,
    name,
    email,
    avatarUrl,
    phoneNumber,
    address,
    latitude,
    longitude,
    description,
    homePageUrl,
    heroImageUrl,
    inquiries,
    members,
  } = dtoOrg;

  const _address: Address = {
    address,
    longitude,
    latitude,
  };

  const _inq = createGqlConn(inquiries);
  const edges = members.map((id) => {
    return { cursor: id, isAdmin: id === adminId ? true : false, node: { id } };
  });
  const _mem = { pageInfo: { hasNext: false, hasPrevious: false }, edges };

  return {
    id,
    name,
    email,
    phoneNumber,
    description,
    address: _address,
    avatarUrl,
    heroImageUrl,
    homePage: homePageUrl,
    inquiries: _inq,
    members: _mem,
  };

  // return {
  //   id,
  //   orgName: name,
  //   address,
  //   latitude,
  //   longitude,
  //   email,
  //   phoneNumber,
  //   description,
  //   homePage,
  //   avatar,
  //   image,
  //   members: idsMapper(members),
  //   inquiries: idsMapper(inquiries),
  // };
};
export const dtoOrgsToGql = (dtoOrgs: DTOOrg[]): Org[] => {
  return dtoOrgs.map((org) => dtoOrgToGql(org));
};

export const readOrgToGql = (readOrg: OrgReadModel): Org => {
  const { latitude, longitude, address, members, ...rest } = readOrg;
  const _address = { address, latitude, longitude };
  const _memConn: MemberConnection = {
    pageInfo: { hasNext: false, hasPrevious: false },
    edges: members.map((mem) => {
      return { cursor: mem.id, isAdmin: false, node: { ...mem } };
    }),
  };
  members;

  return {
    address: _address,
    members: _memConn,
    ...rest,
  };
};

// // TODO:these function is used still impl CQRS
// export const dtoOrgToGqlWithUser = (
//   dtoOrg: DTOOrg,
//   dtoUser: DTOUser[]
// ): NexusGenFieldTypes["Org"] => {
//   const org = dtoOrgToGql(dtoOrg);
//   const members = org.members.map((member) => {
//     const user = dtoUser.find((user) => user.id === member.id);
//     const _user = { ...user, belongOrgs: [], messages: [], belongBases: [] };
//     return _user;
//   });
//   return { ...org, members: members };
// };

// export const dtoOrgsToGqlWithUser = (
//   dtoOrgs: DTOOrg[],
//   dtoUser: DTOUser[]
// ): NexusGenFieldTypes["Org"][] => {
//   const orgs = dtoOrgs.map((org) => dtoOrgToGqlWithUser(org, dtoUser));
//   return orgs;
// };
