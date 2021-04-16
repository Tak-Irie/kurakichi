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
      const requestUserId = UniqueEntityId.reconstruct(arg.requestUserId);
      const requestedOrgId = UniqueEntityId.reconstruct(arg.requestedOrgId);

      const dbResult = await this.OrgRepo.requestJoinOrg(
        requestUserId.getValue(),
        requestedOrgId.getValue(),
      );

      if (dbResult == false) return left(new StoreConnectionError());

      return right(Result.success<Org>(dbResult));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
