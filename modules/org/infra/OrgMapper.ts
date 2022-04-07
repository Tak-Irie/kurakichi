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
      members: members ? getIdFromObjectInArray(members) : [],
      inquiries: inquiries ? getIdFromObjectInArray(inquiries) : [],
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
      latitude,
      longitude,
      name,
      phoneNumber,
      inquiries,
      members,
    } = Org.getProps();
    return {
      id: id.getId(),
      adminId: adminId.getId(),
      avatar: avatar.getURL(),
      description: description.getContent(),
      email: email.getValue(),
      homePage: homePage.getURL(),
      image: image.getURL(),
      location: location.getValue(),
      latitude: latitude.getValue(),
      longitude: longitude.getValue(),
      name: name.getValue(),
      phoneNumber: phoneNumber.getValue(),
    };
  }
}
