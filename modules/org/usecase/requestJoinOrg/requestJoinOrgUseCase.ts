import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IOrgRepo } from "../../domain";
import { createDTOOrgFromDomain, DTOOrg } from "../DTOOrg";
import { NotAcceptJoinError, NotFoundOrgError } from "./requestJoinOrgError";

type JoinOrgArg = { requestUserId: string; requestedOrgId: string };

type RequestJoinOrgResponse = Either<
  | NotAcceptJoinError
  | NotFoundOrgError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOOrg>
>;

export class RequestJoinOrgUsecase
  implements IUsecase<JoinOrgArg, Promise<RequestJoinOrgResponse>>
{
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: JoinOrgArg): Promise<RequestJoinOrgResponse> {
    try {
      const isUserId = UniqueEntityId.createFromArg({ id: arg.requestUserId });
      if (isUserId === false)
        return left(new InvalidInputValueError("wip", ""));
      const isOrgId = UniqueEntityId.createFromArg({
        id: arg.requestedOrgId,
      });
      if (isOrgId === false) return left(new InvalidInputValueError("wip", ""));

      // TODO:Fix flow
      const dbResult = await this.OrgRepo.requestJoinOrg(isUserId, isOrgId);
      if (dbResult == false) return left(new StoreConnectionError(""));

      const dtoOrg = createDTOOrgFromDomain(dbResult);

      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
