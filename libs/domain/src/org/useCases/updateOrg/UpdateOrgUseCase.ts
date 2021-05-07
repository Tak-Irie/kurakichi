import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  NotExistError,
  UniqueEntityId,
} from '../../../shared';
import { IOrgRepo, Org } from '../../domain';
import { NotAuthorizedError } from './UpdateOrgError';
import { createDTOOrgFromDomain, DTOOrg } from '../DTOOrg';

type UpdateOrgArg = {
  requestUserId: string;
  orgId: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;
  description?: string;
  adminId?: string;
  avatar?: string;
  image?: string;
  homePage?: string;
};

type UpdateOrgResponse = Either<
  | NotAuthorizedError
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOOrg>
>;

export class UpdateOrgUseCase implements IUseCase<UpdateOrgArg, Promise<UpdateOrgResponse>> {
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: UpdateOrgArg): Promise<UpdateOrgResponse> {
    try {
      const orgIdOrError = UniqueEntityId.reconstruct(arg.orgId);
      if (orgIdOrError.isFailure)
        return left(new InvalidInputValueError(orgIdOrError.getErrorValue()));

      const currentOrg = await this.OrgRepo.getOrgById(orgIdOrError.getValue());
      if (currentOrg == false) return left(new NotExistError('団体が存在しません'));

      const validNewProps = Org.validateProps(arg);
      const updatedOrg = Org.updateProps();

      const dbResult = await this.OrgRepo.updateOrg();

      const dtoOrg = createDTOOrgFromDomain(dbResult);
      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
