import {
  Result,
  Email,
  ValidURL,
  UniqueEntityId,
  AggregateRoot,
  PhoneNumber,
  Location,
  PropTypes,
  PropPrimitives,
  PropInResult,
} from '../../shared';
import { OrgDescription } from './OrgDescription';
import { OrgName } from './OrgName';

export interface OrgProps {
  id: UniqueEntityId;
  name: OrgName;
  email: Email;
  phoneNumber: PhoneNumber;
  location: Location;
  description: OrgDescription;
  adminId: UniqueEntityId;
  avatar: ValidURL;
  image: ValidURL;
  homePage: ValidURL;
  members: UniqueEntityId[];
  inquiries: UniqueEntityId[];
}

export type OrgPropInResult = PropInResult<Partial<OrgProps>>;
type OrgPropPrimitives = PropPrimitives<OrgProps, 'members' | 'inquiries'> & {
  members: string[];
  inquiries: string[];
};

type OrgInitialCreate = 'id' | 'name' | 'email' | 'phoneNumber' | 'location' | 'adminId';
type OrgUpdatable =
  | 'name'
  | 'email'
  | 'phoneNumber'
  | 'location'
  | 'description'
  | 'adminId'
  | 'avatar'
  | 'image'
  | 'homePage';

type OrgValidatorArg = Partial<Pick<OrgPropPrimitives, OrgUpdatable>>;

// FIXME:need abstract funcs, restore, update, validate
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
      description: OrgDescription.create({ content: 'UNKNOWN' }).getValue(),
      avatar: ValidURL.create({ url: 'UNKNOWN' }).getValue(),
      homePage: ValidURL.create({ url: 'UNKNOWN' }).getValue(),
      image: ValidURL.create({ url: 'UNKNOWN' }).getValue(),
      members: [adminId],
      inquiries: [],
    });
    // Org.addDomainEvent(new OrganizationCreated(Org));
    return Result.success<Org>(organization);
  }

  public static restoreFromRepo(storedOrg: OrgPropPrimitives): Org {
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
      avatar: ValidURL.restoreFromRepo(avatar),
      email: Email.restoreFromRepo(email),
      description: OrgDescription.restoreFromRepo(description),
      homePage: ValidURL.restoreFromRepo(homePage),
      id: UniqueEntityId.restoreFromRepo(id),
      image: ValidURL.restoreFromRepo(image),
      inquiries: UniqueEntityId.restoreArrayFromRepo(inquiries),
      location: Location.restoreFromRepo(location),
      members: UniqueEntityId.restoreArrayFromRepo(members),
      name: OrgName.restoreFromRepo(name),
      phoneNumber: PhoneNumber.restoreFromRepo(phoneNumber),
    });

    return org;
  }

  public static updateProps(currentOrg: Org, newProps: Partial<Pick<OrgProps, OrgUpdatable>>): Org {
    const {
      adminId,
      avatar,
      description,
      email,
      homePage,
      image,
      location,
      name,
      phoneNumber,
    } = newProps;

    const {
      phoneNumber: prevPhone,
      name: prevName,
      avatar: prevAvatar,
      description: prevDesc,
      email: prevEmail,
      homePage: prevHomePage,
      image: prevImg,
      location: prevLocation,
      adminId: prevAdmin,
      id,
      inquiries,
      members,
    } = currentOrg.getProps();

    const updatedOrg = new Org({
      avatar: avatar ? avatar : prevAvatar,
      description: description ? description : prevDesc,
      email: email ? email : prevEmail,
      homePage: homePage ? homePage : prevHomePage,
      image: image ? image : prevImg,
      location: location ? location : prevLocation,
      name: name ? name : prevName,
      phoneNumber: phoneNumber ? phoneNumber : prevPhone,
      adminId: adminId ? adminId : prevAdmin,
      id,
      members,
      inquiries,
    });

    return updatedOrg;
  }

  // FIXME:ugly
  public static validateProps(props: OrgValidatorArg): OrgPropInResult {
    // console.log('validatePropsArg:', props);
    const results: OrgPropInResult = {};

    const {
      adminId,
      description,
      email,
      homePage,
      location,
      name,
      phoneNumber,
      avatar,
      image,
    } = props;

    // console.log('adminId:', adminId);
    if (adminId) {
      const x = UniqueEntityId.reconstruct(adminId);
      // console.log('x:', x);
      results.adminId = x;
    }
    // console.log('result.adminId:', results.adminId);
    if (description) {
      results.description = OrgDescription.create({ content: description });
    }
    if (email) {
      results.email = Email.create({ email });
    }
    if (homePage) {
      results.homePage = ValidURL.create({ url: homePage });
    }
    if (location) {
      results.location = Location.create({ location: location });
    }
    if (name) {
      results.name = OrgName.create({ name });
    }
    if (phoneNumber) {
      results.phoneNumber = PhoneNumber.create({ phoneNumber });
    }
    if (avatar) {
      results.avatar = ValidURL.create({ url: avatar });
    }
    if (image) {
      results.image = ValidURL.create({ url: image });
    }

    // console.log('validatorResult:', results);
    return results;
  }
}
