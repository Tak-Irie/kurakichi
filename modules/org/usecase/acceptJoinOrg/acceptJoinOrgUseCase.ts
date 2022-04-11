import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IOrgRepo, Org } from "../../domain";
import { createDTOOrgFromDomain, DTOOrg } from "../DTOOrg";
import {
  NotAuthorizedError,
  NotFoundUserError,
  NotFoundOrgError,
  AlreadyUserIsMemberError,
} from "./acceptJoinOrgError";

type AcceptJoinOrgArg = {
  orgId: string;
  userId: string;
  // acceptorMemberId: string;
};

type AcceptJoinOrgResponse = Either<
  | AlreadyUserIsMemberError
  | NotFoundOrgError
  | NotAuthorizedError
  | NotFoundUserError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOOrg>
>;

// FIXME: add auth to accept feature
export class AcceptJoinOrgUsecase
  implements IUsecase<AcceptJoinOrgArg, Promise<AcceptJoinOrgResponse>>
{
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: AcceptJoinOrgArg): Promise<AcceptJoinOrgResponse> {
    try {
      const isId = UniqueEntityId.createFromArg({ id: arg.orgId });
      if (isId === false) return left(new InvalidInputValueError("wip", ""));

      const requestedOrg = await this.OrgRepo.getOrgById(isId);
      if (requestedOrg == false) return left(new NotFoundOrgError(""));

      // console.log(
      //   'requestedOrg:',
      //   requestedOrg.getMembers().map((member) => member.getId()),
      // );
      console.log("orgId:", arg.orgId);
      console.log("joinerId:", arg.userId);
      const isBelonged = requestedOrg.getMembers().some(
        (member) => member === arg.userId
        // console.log('member:', member);
        // console.log('requester', arg.userId);
      );
      // console.log('be:', isBelonged);
      if (isBelonged) return left(new AlreadyUserIsMemberError(""));

      const registeredResult = await this.OrgRepo.acceptJoinOrg(
        UniqueEntityId.restoreFromRepo({ id: arg.orgId }),
        UniqueEntityId.restoreFromRepo({ id: arg.userId })
      );
      if (registeredResult == false) return left(new StoreConnectionError(""));

      const dtoOrg = createDTOOrgFromDomain(registeredResult);

      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
