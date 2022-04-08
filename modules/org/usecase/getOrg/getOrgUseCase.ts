import {
  IUsecase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
  InvalidInputValueError,
} from "../../../shared";
import { IOrgRepo } from "../../domain";
import { createDTOOrgFromDomain, DTOOrg } from "../DTOOrg";
import { NotFoundOrgError } from "./getOrgError";

type GetOrgArg = { orgId: string };

type GetOrgResponse = Either<
  | NotFoundOrgError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOOrg>
>;

export class GetOrgUsecase
  implements IUsecase<GetOrgArg, Promise<GetOrgResponse>>
{
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: GetOrgArg): Promise<GetOrgResponse> {
    try {
      const idOrError = UniqueEntityId.reconstruct(arg.orgId);
      if (idOrError.isFailure)
        return left(new InvalidInputValueError(idOrError.getErrorValue()));
      // console.log('id:', idOrError);

      const dbResult = await this.OrgRepo.getOrgById(idOrError.getValue());
      if (dbResult == false) return left(new NotFoundOrgError());
      // console.log('org:', dbResult);

      const dtoOrg = createDTOOrgFromDomain(dbResult);

      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
