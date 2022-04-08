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
import { IInquiryRepo, IOrgRepo } from '../../domain';
import { NotAppropriateUserError } from './GetInquiriesByTreeIdError';
import { createDTOInquiriesFromDomain, DTOInquiry } from '../DTOInquiry';

type GetInquiriesByTreeIdArg = { treeId: string; requestUserId: string };

type GetInquiriesByTreeIdResponse = Either<
  | NotAppropriateUserError
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOInquiry[]>
>;

export class GetInquiriesByTreeIdUseCase
  implements IUseCase<GetInquiriesByTreeIdArg, Promise<GetInquiriesByTreeIdResponse>>
{
  constructor(private InquiryRepo: IInquiryRepo, private OrgRepo: IOrgRepo) {
    this.InquiryRepo = InquiryRepo;
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: GetInquiriesByTreeIdArg): Promise<GetInquiriesByTreeIdResponse> {
    try {
      const treeIdOrError = UniqueEntityId.reconstruct(arg.treeId);
      if (treeIdOrError.isFailure)
        return left(new InvalidInputValueError(treeIdOrError.getErrorValue()));

      const userIdOrError = UniqueEntityId.reconstruct(arg.requestUserId);
      if (userIdOrError.isFailure)
        return left(new InvalidInputValueError(userIdOrError.getErrorValue()));

      const dbInquiries = await this.InquiryRepo.getInquiryTreeById(treeIdOrError.getValue());
      if (dbInquiries == false) return left(new NotExistError('お問い合わせが存在しません'));

      const orgId = UniqueEntityId.restoreFromRepo(dbInquiries[0].getReceivedOrg());
      const valid = await this.OrgRepo.confirmMemberExistence(orgId, userIdOrError.getValue());
      if (valid == false) return left(new NotAppropriateUserError());

      const dtoInquiries = createDTOInquiriesFromDomain(dbInquiries);
      return right(Result.success<DTOInquiry[]>(dtoInquiries));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
