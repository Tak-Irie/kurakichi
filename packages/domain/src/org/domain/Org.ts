import { OrgDescription, OrgName } from '.';
import { Nothing, PropInResult, Result } from '../../shared/core';
import {
  Address,
  AggregateRoot,
  Email,
  Geocode,
  PhoneNumber,
  PropPrimitives,
  UniqueEntityId,
  ValidURL,
} from '../../shared/domain';

export interface OrgProps {
  id: UniqueEntityId;
  name: OrgName;
  email: Email;
  phoneNumber: PhoneNumber;
  address: Address;
  latitude: Geocode;
  longitude: Geocode;
  description: OrgDescription | Nothing;
  adminId: UniqueEntityId;
  avatarUrl: ValidURL | Nothing;
  heroImageUrl: ValidURL | Nothing;
  homePageUrl: ValidURL | Nothing;
  members: UniqueEntityId[];
  inquiries: UniqueEntityId[];
}

type CreateArg = {
  adminId: UniqueEntityId;
  name: OrgName;
  address: Address;
  phoneNumber: PhoneNumber;
  email: Email;
  latitude: Geocode;
  longitude: Geocode;
};

export type OrgPropInResult = PropInResult<Partial<OrgProps>>;

type OrgPropPrimitives = PropPrimitives<
  OrgProps,
  'latitude' | 'longitude' | 'members' | 'inquiries'
> & {
  latitude: number;
  longitude: number;
  members: string[];
  inquiries: string[];
};

type OrgInitialCreate =
  | 'id'
  | 'name'
  | 'email'
  | 'phoneNumber'
  | 'address'
  | 'latitude'
  | 'longitude'
  | 'adminId';
type OrgUpdatable =
  | 'name'
  | 'email'
  | 'phoneNumber'
  | 'address'
  | 'latitude'
  | 'longitude'
  | 'description'
  | 'adminId'
  | 'avatarUrl'
  | 'heroImageUrl'
  | 'homePageUrl';

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

  public getOrgAddress(): string {
    return this.props.address.getValue();
  }

  public getEmail(): string {
    return this.props.email.getValue();
  }

  public getMembers(): string[] {
    const ids = this.getProps().members;
    return ids.map((id) => id.getId());
  }

  public static _create(arg: CreateArg) {
    const { address, adminId, email, name, phoneNumber, latitude, longitude } =
      arg;
    const org = new Org({
      id: UniqueEntityId.createULID(),
      adminId,
      name,
      phoneNumber,
      email,
      address,
      latitude,
      longitude,
      avatarUrl: '',
      description: '',
      homePageUrl: '',
      heroImageUrl: '',
      inquiries: [],
      members: [adminId],
    });
    return Result.success<Org>(org);
  }

  public static create(props: Pick<OrgProps, OrgInitialCreate>): Result<Org> {
    const {
      adminId,
      email,
      id,
      address,
      name,
      phoneNumber,
      latitude,
      longitude,
    } = props;
    const organization = new Org({
      id,
      name,
      email,
      address,
      latitude,
      longitude,
      phoneNumber,
      adminId,
      description: OrgDescription.create({ content: 'UNKNOWN' }).getValue(),
      avatarUrl: ValidURL.create({ url: 'UNKNOWN' }).getValue(),
      homePageUrl: ValidURL.create({ url: 'UNKNOWN' }).getValue(),
      heroImageUrl: ValidURL.create({ url: 'UNKNOWN' }).getValue(),
      members: [adminId],
      inquiries: [],
    });
    // Org.addDomainEvent(new OrganizationCreated(Org));
    return Result.success<Org>(organization);
  }

  public static restoreFromRepo(storedOrg: OrgPropPrimitives): Org {
    const {
      adminId,
      avatarUrl,
      description,
      email,
      homePageUrl,
      id,
      heroImageUrl,
      inquiries,
      address,
      latitude,
      longitude,
      members,
      name,
      phoneNumber,
    } = storedOrg;
    const org = new Org({
      adminId: UniqueEntityId.restoreFromRepo({ id: adminId }),
      avatarUrl: ValidURL.restoreFromRepo(avatarUrl),
      email: Email.restoreFromRepo(email),
      description: OrgDescription.restoreFromRepo(description),
      homePageUrl: ValidURL.restoreFromRepo(homePageUrl),
      id: UniqueEntityId.restoreFromRepo({ id }),
      heroImageUrl: ValidURL.restoreFromRepo(heroImageUrl),
      inquiries: UniqueEntityId.restoreArrayFromRepo(
        inquiries.map((inq) => {
          return { id: inq };
        }),
      ),
      address: Address.restoreFromRepo({ address }),
      latitude: Geocode.restoreFromRepo(latitude),
      longitude: Geocode.restoreFromRepo(longitude),
      members: UniqueEntityId.restoreArrayFromRepo(
        members.map((mem) => {
          return { id: mem };
        }),
      ),
      name: OrgName.restoreFromRepo(name),
      phoneNumber: PhoneNumber.restoreFromRepo(phoneNumber),
    });

    return org;
  }

  public static updateProps(
    currentOrg: Org,
    newProps: Partial<Pick<OrgProps, OrgUpdatable>>,
  ): Org {
    const {
      adminId,
      avatarUrl,
      description,
      email,
      homePageUrl,
      heroImageUrl,
      address,
      latitude,
      longitude,
      name,
      phoneNumber,
    } = newProps;

    const {
      phoneNumber: prevPhone,
      name: prevName,
      avatarUrl: prevAvatar,
      description: prevDesc,
      email: prevEmail,
      homePageUrl: prevHomePage,
      heroImageUrl: prevImg,
      address: prevAddress,
      latitude: prevLatitude,
      longitude: prevLongitude,
      adminId: prevAdmin,
      id,
      inquiries,
      members,
    } = currentOrg.getProps();

    const updatedOrg = new Org({
      avatarUrl: avatarUrl ? avatarUrl : prevAvatar,
      description: description ? description : prevDesc,
      email: email ? email : prevEmail,
      homePageUrl: homePageUrl ? homePageUrl : prevHomePage,
      heroImageUrl: heroImageUrl ? heroImageUrl : prevImg,
      address: address ? address : prevAddress,
      latitude: latitude ? latitude : prevLatitude,
      longitude: longitude ? longitude : prevLongitude,
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
      homePageUrl,
      address,
      name,
      phoneNumber,
      avatarUrl,
      heroImageUrl,
    } = props;

    // console.log('adminId:', adminId);
    if (adminId) {
      const isId = UniqueEntityId.createFromArg({ id: adminId });
      if (isId === false) {
        // FIXME:temp
        throw new Error();
      }
      results.adminId = Result.success<UniqueEntityId>(isId);
    }
    // console.log('result.adminId:', results.adminId);
    if (description) {
      results.description = OrgDescription.create({ content: description });
    }
    if (email) {
      results.email = Email.create({ email });
    }
    if (homePageUrl) {
      results.homePageUrl = ValidURL.create({ url: homePageUrl });
    }
    if (address) {
      results.address = Address.create({ address });
    }
    if (name) {
      results.name = OrgName.create({ name });
    }
    if (phoneNumber) {
      results.phoneNumber = PhoneNumber.create({ phoneNumber });
    }
    if (avatarUrl) {
      results.avatarUrl = ValidURL.create({ url: avatarUrl });
    }
    if (heroImageUrl) {
      results.heroImageUrl = ValidURL.create({ url: heroImageUrl });
    }

    // console.log('validatorResult:', results);
    return results;
  }
}
