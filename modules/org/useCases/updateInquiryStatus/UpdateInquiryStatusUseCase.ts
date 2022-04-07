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
import { IInquiryRepo } from '../../domain';
import { InquiryStatus } from '../../domain/InquiryStatus';
import { DTOInquiry, createDTOInquiryFromDomain } from '../DTOInquiry';

type UpdateInquiryStatusArg = { inquiryId: string; inquiryStatus: string };

type UpdateInquiryStatusResponse = Either<
  NotExistError | InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOInquiry>
>;

export class UpdateInquiryStatusUseCase
  implements IUseCase<UpdateInquiryStatusArg, Promise<UpdateInquiryStatusResponse>>
{
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(arg: UpdateInquiryStatusArg): Promise<UpdateInquiryStatusResponse> {
    try {
      const idOrError = UniqueEntityId.reconstruct(arg.inquiryId);
      if (idOrError.isFailure) return left(new InvalidInputValueError(idOrError.getErrorValue()));

      const statusOrError = InquiryStatus._create(arg.inquiryStatus);
      if (statusOrError.isFailure)
        return left(new InvalidInputValueError(statusOrError.getErrorValue()));

      const dbResult = await this.InquiryRepo.updateInquiryStatus(
        idOrError.getValue(),
        statusOrError.getValue(),
      );

      const dtoInquiry = createDTOInquiryFromDomain(dbResult);
      // console.log('dtoInquiryInUpdateInqUC:', dtoInquiry);

      return right(Result.success<DTOInquiry>(dtoInquiry));
    } catch (err) {
      if (err === Error('データベースエラー')) return left(new StoreConnectionError());
      return left(new UnexpectedError(err));
    }
  }
}
