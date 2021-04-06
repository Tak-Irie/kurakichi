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
import { NotFoundOrgError, AlreadyBelongedError } from './joinOrgError';

type JoinOrgInput = {
  joinedOrgId: string;
  joinUserId: string;
};

type JoinOrgResponse = Either<
  NotFoundOrgError | AlreadyBelongedError | UnexpectedError | StoreConnectionError,
  Result<Org>
>;

export class JoinOrgUseCase implements IUseCase<JoinOrgInput, Promise<JoinOrgResponse>> {
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(req: JoinOrgInput): Promise<JoinOrgResponse> {
    try {
      const foundOrg = await this.OrgRepo.getOrgById(new UniqueEntityId(req.joinedOrgId));
      if (foundOrg == undefined) return left(new NotFoundOrgError());

      console.log(
        'foundOrg:',
        foundOrg.getMembers().map((member) => member.getId()),
      );
      console.log('joinId:', req.joinUserId);
      const belonged = foundOrg.getMembers().some((member) => {
        member.getId() === req.joinUserId;
        console.log(typeof member.getId());
        console.log(typeof req.joinUserId);
      });
      console.log('be:', belonged);
      if (belonged) return left(new AlreadyBelongedError());

      const registeredResult = await this.OrgRepo.registerMember(
        new UniqueEntityId(req.joinedOrgId),
        new UniqueEntityId(req.joinUserId),
      );

      if (registeredResult == false) return left(new StoreConnectionError());

      return right(Result.success<Org>(foundOrg));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
