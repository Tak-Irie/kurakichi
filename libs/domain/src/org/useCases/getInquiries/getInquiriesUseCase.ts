import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  UniqueEntityId,
} from '../../../shared';
import { IInquiryRepo } from '../../domain';
import { createDTOInquiriesFromDomain, DTOInquiry } from '../DTOInquiry';

type InquiriesArg = { orgId: string };

type GetInquiriesResponse = Either<
  InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOInquiry[]>
>;

export class GetInquiriesUseCase implements IUseCase<InquiriesArg, Promise<GetInquiriesResponse>> {
  constructor(private InquiriesRepo: IInquiryRepo) {
    this.InquiriesRepo = InquiriesRepo;
  }
  public async execute(arg: InquiriesArg): Promise<GetInquiriesResponse> {
    try {
      const orgId = UniqueEntityId.reconstruct(arg.orgId);
      const dbInquiries = await this.InquiriesRepo.getInquiries(orgId.getValue());
      if (dbInquiries == false) return right(Result.success<DTOInquiry[]>([]));

      const dtoInquiries = createDTOInquiriesFromDomain(dbInquiries);
      return right(Result.success<DTOInquiry[]>(dtoInquiries));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
