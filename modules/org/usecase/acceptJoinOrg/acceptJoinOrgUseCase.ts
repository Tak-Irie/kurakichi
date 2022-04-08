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
import { createDTOOrgFromDomain, DTOOrg } from '../DTOOrg';
import {
  NotAuthorizedError,
  NotFoundUserError,
  NotFoundOrgError,
  AlreadyUserIsMemberError,
} from './acceptJoinOrgError';

type AcceptJoinOrgArg = {
  requestedOrgId: string;
  requestUserId: string;
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
export class AcceptJoinOrgUseCase
  implements IUseCase<AcceptJoinOrgArg, Promise<AcceptJoinOrgResponse>>
{
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(req: AcceptJoinOrgArg): Promise<AcceptJoinOrgResponse> {
    try {
      const requestedOrg = await this.OrgRepo.getOrgById(
        UniqueEntityId.reconstruct(req.requestedOrgId).getValue(),
      );
      if (requestedOrg == false) return left(new NotFoundOrgError());

      // console.log(
      //   'requestedOrg:',
      //   requestedOrg.getMembers().map((member) => member.getId()),
      // );
      console.log('orgId:', req.requestedOrgId);
      console.log('joinerId:', req.requestUserId);
      const isBelonged = requestedOrg.getMembers().some(
        (member) => member === req.requestUserId,
        // console.log('member:', member);
        // console.log('requester', req.requestUserId);
      );
      // console.log('be:', isBelonged);
      if (isBelonged) return left(new AlreadyUserIsMemberError());

      const registeredResult = await this.OrgRepo.acceptJoinOrg(
        UniqueEntityId.reconstruct(req.requestedOrgId).getValue(),
        UniqueEntityId.reconstruct(req.requestUserId).getValue(),
      );
      if (registeredResult == false) return left(new StoreConnectionError());

      const dtoOrg = createDTOOrgFromDomain(registeredResult);

      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
