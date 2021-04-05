import { Organization as StoredOrg, User as StoredUser } from '@prisma/client';
import { Email, PhoneNumber, UniqueEntityId } from '../../shared';
import { UserEmail, UserName } from '../../user';
import { Member, Org } from '../domain';
import { OrgLocation } from '../domain/OrgLocation';
import { OrgName } from '../domain/OrgName';

type ToDomainProps = {
  org: StoredOrg & {
    members?: StoredUser[];
  };
};
export class OrgMapper {
  public static async ToDomain(props: ToDomainProps): Promise<Org> {
    const orgName = OrgName.create({ name: props.org.name });
    const orgLocation = OrgLocation.create({ location: props.org.location });
    const orgEmail = Email.create({ email: props.org.email });
    const orgPhone = PhoneNumber.create({ phoneNumber: props.org.phone });

    let members: Member[];

    if (props.org.members) {
      members = props.org.members.map((member) => {
        return new Member({
          id: new UniqueEntityId(member.id),
          memberName: UserName.create({ userName: member.name }).getValue(),
          email: UserEmail.create({ email: member.email }).getValue(),
        });
      });
    }

    const OrgResult = new Org({
      id: new UniqueEntityId(props.org.id),
      name: orgName.getValue(),
      location: orgLocation.getValue(),
      adminId: new UniqueEntityId(props.org.adminId),
      members,
      email: orgEmail.getValue(),
      phoneNumber: orgPhone.getValue(),
      homePage: 'UNKNOWN',
      img: 'UNKNOWN',
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
