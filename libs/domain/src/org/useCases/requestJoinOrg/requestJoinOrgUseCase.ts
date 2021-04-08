import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
  Identifier,
} from '../../../shared';
import { IOrgRepo, Member, Org } from '../../domain';
import { NotAcceptJoinError, NotFoundOrgError } from './requestJoinOrgError';

type JoinOrgArg = { requestUserId: string; requestedOrgId: string };

type RequestJoinOrgResponse = Either<
  NotAcceptJoinError | NotFoundOrgError | UnexpectedError | StoreConnectionError,
  Result<Org>
>;

export class RequestJoinOrgUseCase
  implements IUseCase<JoinOrgArg, Promise<RequestJoinOrgResponse>> {
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: JoinOrgArg): Promise<RequestJoinOrgResponse> {
    try {
      const userId = new UniqueEntityId(arg.requestUserId);
      const orgId = new UniqueEntityId(arg.requestedOrgId)

      const result = await this.OrgRepo.requestJoinOrg(reqId:userId, orgId);
      return right(
        Result.success<Org>({ some: result.getValue() }),
      );
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
