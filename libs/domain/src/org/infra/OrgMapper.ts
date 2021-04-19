import { getIdFromObjectInArray } from '@kurakichi/node-util';
import { Organization as StoredOrg } from '@prisma/client';
import { Org } from '../domain';

type StoredOrgRelation = StoredOrg & {
  members?: { id: string }[];
  inquiries?: { id: string }[];
};

export class OrgMapper {
  public static ToDomain(storedOrg: StoredOrgRelation): Org {
    const { members, inquiries, ...props } = storedOrg;
    const domainOrg = Org.restoreFromRepo({
      ...props,
      members: getIdFromObjectInArray(members),
      inquiries: getIdFromObjectInArray(inquiries),
    });

    return domainOrg;
  }

  public static ArrayToDomain(storedOrgs: StoredOrgRelation[]): Org[] {
    const domainOrgArray = storedOrgs.map((org) => OrgMapper.ToDomain(org));
    return domainOrgArray;
  }

  public static toStore(Org: Org): StoredOrg {
    const {
      id,
      adminId,
      avatar,
      description,
      email,
      homePage,
      image,
      location,
      name,
      phoneNumber,
      inquiries,
      members,
    } = Org.getProps();
    return {
      id: id.getId(),
      adminId: adminId.getId(),
      avatar: avatar as string,
      description,
      email: email.getValue(),
      homePage: homePage,
      image: image as string,
      location: location.getValue(),
      name: name.getValue(),
      phoneNumber: phoneNumber.getValue(),
    };
  }
}
