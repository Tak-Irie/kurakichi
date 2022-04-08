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
import { IInquiryRepo } from '../../domain';
import { createDTOInquiryFromDomain, DTOInquiry } from '../DTOInquiry';
import { InquiryNotExistError } from './getInquiryError';

type InquiryArg = { inquiryId: string };

type GetInquiryResponse = Either<
  InquiryNotExistError | UnexpectedError | StoreConnectionError,
  Result<DTOInquiry>
>;

export class GetInquiryUseCase implements IUseCase<InquiryArg, Promise<GetInquiryResponse>> {
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(arg: InquiryArg): Promise<GetInquiryResponse> {
    try {
      const inquiryId = UniqueEntityId.reconstruct(arg.inquiryId);

      const dbResult = await this.InquiryRepo.getInquiry(inquiryId.getValue());
      if (dbResult == false) return left(new StoreConnectionError());

      const dtoInquiry = createDTOInquiryFromDomain(dbResult);
      return right(Result.success<DTOInquiry>(dtoInquiry));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
