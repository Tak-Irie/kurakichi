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
import { createDTOOrgFromDomain, DTOOrg } from '../DTOOrg';
import { AlreadyRegisteredNameError } from './registerOrgError';

type OrgArg = {
  adminId: string;
  orgName: string;
  location: string;
  phoneNumber: string;
  email: string;
};

type OrgTypes = OrgName | OrgLocation | Email | PhoneNumber | UniqueEntityId;

type RegisterOrgResponse = Either<
  AlreadyRegisteredNameError | UnexpectedError | StoreConnectionError | Result<OrgTypes>,
  Result<DTOOrg>
>;

export class RegisterOrgUseCase implements IUseCase<OrgArg, Promise<RegisterOrgResponse>> {
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: OrgArg): Promise<RegisterOrgResponse> {
    try {
      const orgNameOrError = OrgName.create({ name: arg.orgName });
      const locationOrError = OrgLocation.create({ location: arg.location });
      const emailOrError = Email.create({ email: arg.email });
      const phoneOrError = PhoneNumber.create({ phoneNumber: arg.phoneNumber });
      const adminIdOrError = UniqueEntityId.reconstruct(arg.adminId);

      const verifiedResult = Result.verifyResults<OrgTypes>([
        orgNameOrError,
        locationOrError,
        emailOrError,
        phoneOrError,
        adminIdOrError,
      ]);

      if (verifiedResult.isFailure) {
        return left(Result.fail<OrgTypes>(verifiedResult.getErrorValue()));
      }

      const verifiedOrgName = orgNameOrError.getValue();
      const duplicateCheck = await this.OrgRepo.confirmOrgByName(verifiedOrgName);
      if (duplicateCheck) return left(new AlreadyRegisteredNameError());

      const orgOrError = Org.create({
        id: UniqueEntityId.create(),
        adminId: adminIdOrError.getValue(),
        name: verifiedOrgName,
        email: emailOrError.getValue(),
        location: locationOrError.getValue(),
        phoneNumber: phoneOrError.getValue(),
      });
      if (orgOrError.isFailure) return left(new UnexpectedError());

      const dbResult = await this.OrgRepo.registerOrg(orgOrError.getValue());
      if (dbResult == false) return left(new StoreConnectionError());

      const dtoOrg = createDTOOrgFromDomain(dbResult);
      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
