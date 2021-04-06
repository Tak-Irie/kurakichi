import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
  Email,
  PhoneNumber,
} from '../../../shared';
import { IOrgRepo, Org } from '../../domain';
import { OrgLocation } from '../../domain/OrgLocation';
import { OrgName } from '../../domain/OrgName';
import { SomeError } from './registerOrgError';

type OrgInput = {
  adminId: string;
  orgName: string;
  location: string;
  phoneNumber: string;
  email: string;
};

type OrgTypes = OrgName | OrgLocation | Email | PhoneNumber;

type RegisterOrgResponse = Either<
  SomeError | UnexpectedError | StoreConnectionError | Result<OrgTypes> | Result<false>,
  Result<Org>
>;

export class RegisterOrgUseCase implements IUseCase<OrgInput, Promise<RegisterOrgResponse>> {
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(req: OrgInput): Promise<RegisterOrgResponse> {
    try {
      const nameOrError = OrgName.create({ name: req.orgName });
      const locationOrError = OrgLocation.create({ location: req.location });
      const emailOrError = Email.create({ email: req.email });
      const phoneOrError = PhoneNumber.create({ phoneNumber: req.phoneNumber });

      const verifiedResult = Result.verifyResults<OrgTypes>([
        nameOrError,
        locationOrError,
        emailOrError,
        phoneOrError,
      ]);

      if (verifiedResult.isFailure) {
        return left(Result.fail<OrgTypes>(verifiedResult.getErrorValue()));
      }

      const orgOrError = Org.create({
        id: UniqueEntityId.create(),
        // FIXME:forget to write, what should I fix.
        adminId: new UniqueEntityId(req.adminId),
        name: nameOrError.getValue(),
        email: emailOrError.getValue(),
        location: locationOrError.getValue(),
        phoneNumber: phoneOrError.getValue(),
        img: 'UNKNOWN',
        homePage: 'UNKNOWN',
        icon: 'UNKNOWN',
        members: [],
      });

      if (orgOrError.isFailure) return left(Result.fail<false>(orgOrError.getErrorValue()));

      const result = await this.OrgRepo.registerOrg(orgOrError.getValue());

      if (result == undefined) return left(new StoreConnectionError());

      return right(Result.success<Org>());
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
