import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
} from '../../../shared';
import { IOrgRepo, Org } from '../../domain';
import { OrgLocation } from '../../domain/OrgLocation';
import { OrgName } from '../../domain/OrgName';
import { SomeError } from './registerOrgError';

type OrgInput = {
  adminId: string;
  orgName: string;
  location: string;
};
type RegisterOrgDTO = {
  some: unknown;
};

type OrgTypes = OrgName | OrgLocation;

type RegisterOrgResponse = Either<
  SomeError | UnexpectedError | StoreConnectionError | Result<OrgTypes> | Result<Org>,
  Result<RegisterOrgDTO>
>;

export class RegisterOrgUseCase implements IUseCase<OrgInput, Promise<RegisterOrgResponse>> {
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(req: OrgInput): Promise<RegisterOrgResponse> {
    try {
      const orgNameOrError = OrgName.create({ name: req.orgName });
      const orgLocationOrError = OrgLocation.create({ location: req.location });

      const verifiedResult = Result.verifyResults<OrgTypes>([orgNameOrError, orgLocationOrError]);

      if (verifiedResult.isFailure) {
        return left(Result.fail<OrgTypes>(verifiedResult.getErrorValue()));
      }

      const name = orgNameOrError.getValue();
      const location = orgLocationOrError.getValue();

      const orgOrError = Org.create({
        id: UniqueEntityId.create(),
        // FIXME:
        adminId: new UniqueEntityId(req.adminId),
        name,
        location,
        members: [],
      });

      if (orgOrError.isFailure) return left(Result.fail<Org>(orgOrError.getErrorValue()));

      const result = await this.OrgRepo.registerOrg(orgOrError.getValue());

      if (result == undefined) return left(new StoreConnectionError());

      return right(Result.success<RegisterOrgDTO>());
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
