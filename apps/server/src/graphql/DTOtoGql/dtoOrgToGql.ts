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

  const modifiedAddress: Address = {
    address,
    longitude,
    latitude,
  };

  const modifiedInq = createGqlConn(inquiries);
  const edges = members.map((member) => ({
    cursor: member,
    isAdmin: member === adminId,
    node: { id: member },
  }));
  const memberConn = {
    pageInfo: { hasNext: false, hasPrevious: false },
    edges,
  };

  return {
    id,
    name,
    email,
    phoneNumber,
    description,
    address: modifiedAddress,
    avatarUrl,
    heroImageUrl,
    homePage: homePageUrl,
    inquiries: modifiedInq,
    members: memberConn,
  };
};
export const dtoOrgsToGql = (dtoOrgs: DTOOrg[]): Org[] =>
  dtoOrgs.map((org) => dtoOrgToGql(org));

export const readOrgToGql = (readOrg: OrgReadModel): Org => {
  const { latitude, longitude, address, members, ...rest } = readOrg;
  const modifiedAddress = { address, latitude, longitude };
  const memConn: MemberConnection = {
    pageInfo: { hasNext: false, hasPrevious: false },
    edges: members.map((mem) => ({
      cursor: mem.id,
      isAdmin: false,
      node: { ...mem },
    })),
  };

  return {
    address: modifiedAddress,
    members: memConn,
    ...rest,
  };
};
