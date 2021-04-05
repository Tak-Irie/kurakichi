import { Member } from '.';
import { Result, Email, ValidURL, UniqueEntityId, AggregateRoot, PhoneNumber } from '../../shared';
import { OrgLocation } from './OrgLocation';
import { OrgName } from './OrgName';

interface OrgProps {
  id: UniqueEntityId;
  name: OrgName;
  email: Email;
  phoneNumber: PhoneNumber;
  location: OrgLocation;
  adminId: UniqueEntityId;
  members: Member[];
  img: ValidURL | 'UNKNOWN';
  homePage: string | 'UNKNOWN';
}

export class Org extends AggregateRoot<OrgProps> {
  constructor(readonly props: OrgProps) {
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

  public getMembers(): Member[] {
    return this.props.members;
  }

  public static create(props: OrgProps): Result<Org> {
    const _Organization = new Org({
      ...props,
    });
    // Org.addDomainEvent(new OrganizationCreated(Org));
    return Result.success<Org>(_Organization);
  }
}
