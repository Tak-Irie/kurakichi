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
      console.log('updateOrgArg:', arg);
      const orgIdOrError = UniqueEntityId.reconstruct(arg.orgId);
      if (orgIdOrError.isFailure)
        return left(new InvalidInputValueError(orgIdOrError.getErrorValue()));

      const userIdOrError = UniqueEntityId.reconstruct(arg.requestUserId);
      if (userIdOrError.isFailure)
        return left(new InvalidInputValueError(userIdOrError.getErrorValue()));

      // TODO:impl auth sys of updating org stats
      const invalidUser = await this.OrgRepo.confirmMemberExistence(
        orgIdOrError.getValue(),
        userIdOrError.getValue(),
      );
      if (invalidUser == false) return left(new NotAuthorizedError());

      const currentOrg = await this.OrgRepo.getOrgById(orgIdOrError.getValue());
      if (currentOrg == false) return left(new NotExistError('団体が存在しません'));

      delete arg.orgId;
      delete arg.requestUserId;
      const validatedProps = Org.validateProps({ ...arg });
      const failProp = Object.values(validatedProps).filter(
        (resultProp) => resultProp.isFailure === true,
      );
      if (failProp[0]) {
        return left(new InvalidInputValueError(failProp.map((prop) => prop.getErrorValue())));
      }

      const updatedOrg = Org.updateProps(currentOrg, {
        adminId: validatedProps.adminId?.getValue() || undefined,
        avatar: validatedProps.avatar?.getValue() || undefined,
        description: validatedProps.description?.getValue() || undefined,
        email: validatedProps.email?.getValue() || undefined,
        homePage: validatedProps.homePage?.getValue() || undefined,
        image: validatedProps.image?.getValue() || undefined,
        location: validatedProps.location?.getValue() || undefined,
        name: validatedProps.name?.getValue() || undefined,
        phoneNumber: validatedProps.phoneNumber?.getValue() || undefined,
      });

      const dbResult = await this.OrgRepo.updateOrg(updatedOrg);

      const dtoOrg = createDTOOrgFromDomain(dbResult);
      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      if (err === Error('データベースエラー')) return left(new StoreConnectionError());
      return left(new UnexpectedError(err));
    }
  }
}
