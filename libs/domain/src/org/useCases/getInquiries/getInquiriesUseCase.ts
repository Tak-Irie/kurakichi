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
import { IInquiryRepo, Inquiry } from '../../domain';
import { InquiryNotExistError } from './getInquiriesError';

type InquiriesArg = { orgId: string };

type GetInquiriesResponse = Either<
  InquiryNotExistError | InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<Inquiry[]>
>;

export class GetInquiriesUseCase implements IUseCase<InquiriesArg, Promise<GetInquiriesResponse>> {
  constructor(private InquiriesRepo: IInquiryRepo) {
    this.InquiriesRepo = InquiriesRepo;
  }
  public async execute(arg: InquiriesArg): Promise<GetInquiriesResponse> {
    try {
      const orgId = UniqueEntityId.reconstruct(arg.orgId);
      const result = await this.InquiriesRepo.getInquiries(orgId.getValue());
      if (result == false) return left(new InquiryNotExistError());

      return right(Result.success<Inquiry[]>(result));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
