import { Organization as StoredOrg, User as StoredUser } from '@prisma/client';
import { Email, PhoneNumber, UniqueEntityId } from '../../shared';
import { UserEmail, UserName } from '../../user/domain';
import { Member, Org } from '../domain';
import { OrgLocation } from '../domain/OrgLocation';
import { OrgName } from '../domain/OrgName';

type StoredOrgRelation = StoredOrg & {
  members?: StoredUser[];
};

export class OrgMapper {
  public static ToDomain(props: StoredOrgRelation): Org {
    const orgName = OrgName.create({ name: props.name });

    const orgLocation = OrgLocation.create({ location: props.location });
    const orgEmail = Email.create({ email: props.email });
    const orgPhone = PhoneNumber.create({ phoneNumber: props.phone });

    let members: Member[];

    if (props.members) {
      members = props.members.map((member) => {
        return new Member({
          id: UniqueEntityId.reconstruct(member.id).getValue(),
          memberName: UserName.create({ userName: member.name }).getValue(),
          email: UserEmail.create({ email: member.email }).getValue(),
        });
      });
    }

    const OrgResult = new Org({
      id: UniqueEntityId.reconstruct(props.id).getValue(),
      name: orgName.getValue(),
      location: orgLocation.getValue(),
      adminId: UniqueEntityId.reconstruct(props.adminId).getValue(),
      members,
      email: orgEmail.getValue(),
      phoneNumber: orgPhone.getValue(),
      homePage: 'UNKNOWN',
      img: 'UNKNOWN',
      icon: 'UNKNOWN',
    });

    return OrgResult;
  }

  public static async toStore(org: Org): Promise<Omit<StoredOrg, 'createdAt' | 'updatedAt'>> {
    const { phoneNumber, email } = org.getProps();
    return {
      id: org.getId(),
      name: org.getOrgName(),
      location: org.getOrgLocation(),
      adminId: org.getAdminId(),
      email: email.getValue(),
      phone: phoneNumber.getValue(),
      description: 'UNKNOWN',
      homePage: 'UNKNOWN',
      image: 'UNKNOWN',
      icon: 'UNKNOWN',
    };
  }
}
