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
import { IInquiryRepo, Inquiry } from '../../domain';
import { InquiryNotExistError } from './getInquiryError';

type InquiryArg = { inquiryId: string };

type GetInquiryResponse = Either<
  InquiryNotExistError | UnexpectedError | StoreConnectionError,
  Result<Inquiry>
>;

export class GetInquiryUseCase implements IUseCase<InquiryArg, Promise<GetInquiryResponse>> {
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(arg: InquiryArg): Promise<GetInquiryResponse> {
    try {
      const inquiryId = new UniqueEntityId(arg.inquiryId);

      const repoResult = await this.InquiryRepo.getInquiry(inquiryId);
      if (repoResult == false) return left(new StoreConnectionError());

      return right(Result.success<Inquiry>(repoResult));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
