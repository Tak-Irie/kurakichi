import { Result, Email, ValidURL, UniqueEntityId, AggregateRoot, PhoneNumber } from '../../shared';
// import { MemberPrimitive, Member } from './Member';
import { OrgLocation } from './OrgLocation';
import { OrgName } from './OrgName';

// FIXME:create ValidURL VO
interface OrgProps {
  id: UniqueEntityId;
  name: OrgName;
  email: Email;
  phoneNumber: PhoneNumber;
  location: OrgLocation;
  description: string;
  adminId: UniqueEntityId;
  avatar: string | ValidURL;
  image: string | ValidURL;
  homePage: string;
  members: UniqueEntityId[];
  inquiries: UniqueEntityId[];
}

type OrgInitialCreate = 'id' | 'name' | 'email' | 'phoneNumber' | 'location' | 'adminId';

type OrgPrimitive = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  adminId: string;
  description: string;
  avatar: string;
  image: string;
  homePage: string;
  members: string[];
  inquiries: string[];
};

export class Org extends AggregateRoot<OrgProps> {
  private constructor(readonly props: OrgProps) {
    super(props);
  }

  public getId(): string {
    return this.props.id.getId();
  }

  public getAdminId(): string {
    return this.props.adminId.getId();
  }

  public getOrgName(): string {
    return this.props.name.getValue();
  }

  public getOrgLocation(): string {
    return this.props.location.getValue();
  }

  public getEmail(): string {
    return this.props.email.getValue();
  }

  public getMembers(): string[] {
    const ids = this.getProps().members;
    return ids.map((id) => id.getId());
  }

  public static create(props: Pick<OrgProps, OrgInitialCreate>): Result<Org> {
    const { adminId, email, id, location, name, phoneNumber } = props;
    const organization = new Org({
      id,
      name,
      email,
      location,
      phoneNumber,
      adminId,
      members: [adminId],
      description: 'UNKNOWN',
      avatar: 'UNKNOWN',
      homePage: 'UNKNOWN',
      image: 'UNKNOWN',
      inquiries: [],
    });
    // Org.addDomainEvent(new OrganizationCreated(Org));
    return Result.success<Org>(organization);
  }

  public static restoreFromRepo(storedOrg: OrgPrimitive): Org {
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
      members,
      name,
      phoneNumber,
    } = storedOrg;
    const org = new Org({
      adminId: UniqueEntityId.restoreFromRepo(adminId),
      avatar: avatar,
      email: Email.restoreFromRepo(email),
      description,
      homePage: homePage,
      id: UniqueEntityId.restoreFromRepo(id),
      image: image,
      inquiries: UniqueEntityId.restoreArrayFromRepo(inquiries),
      location: OrgLocation.restoreFromRepo(location),
      members: UniqueEntityId.restoreArrayFromRepo(members),
      name: OrgName.restoreFromRepo(name),
      phoneNumber: PhoneNumber.restoreFromRepo(phoneNumber),
    });

    return org;
  }
}
