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
import { InquiryCategory, InquiryCategoryUnion } from '../../domain/InquiryCategory';
import { InquiryContent } from '../../domain/InquiryContent';
import { InquiryStatusUnion, InquiryStatus } from '../../domain/InquiryStatus';
import { createDTOInquiryFromDomain, DTOInquiry } from '../DTOInquiry';
import { ReceiverNotExistError } from './registerInquiryError';

type InquiryArg = {
  category: InquiryCategoryUnion;
  status: InquiryStatusUnion;
  content: string;
  receiverId: string;
  senderId: string;
};

type RegisterInquiryResponse = Either<
  | ReceiverNotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError
  | Result<InquiryTypes>,
  Result<DTOInquiry>
>;

type InquiryTypes = InquiryCategory | InquiryContent | InquiryStatus;

export class RegisterInquiryUseCase
  implements IUseCase<InquiryArg, Promise<RegisterInquiryResponse>> {
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(arg: InquiryArg): Promise<RegisterInquiryResponse> {
    try {
      console.log('registerInquiryArg:', arg);
      const { category, content, receiverId, senderId, status } = arg;
      const categoryOrError = InquiryCategory.create({ type: category });
      const contentOrError = InquiryContent.create({ text: content });
      const statusOrError = InquiryStatus.create({ status: status });

      const verifiedResult = Result.verifyResults<InquiryTypes>([
        categoryOrError,
        contentOrError,
        statusOrError,
      ]);
      if (verifiedResult.isFailure)
        return left(Result.fail<InquiryTypes>(verifiedResult.getErrorValue()));

      const inquiryOrError = Inquiry.create({
        id: UniqueEntityId.create(),
        category: categoryOrError.getValue(),
        status: statusOrError.getValue(),
        content: contentOrError.getValue(),
        receiver: UniqueEntityId.reconstruct(receiverId).getValue(),
        sender: UniqueEntityId.reconstruct(senderId).getValue(),
      });

      const dbResult = await this.InquiryRepo.registerInquiry(inquiryOrError.getValue());
      if (dbResult == false) return left(new StoreConnectionError());

      const dtoInquiry = createDTOInquiryFromDomain(dbResult);
      return right(Result.success<DTOInquiry>(dtoInquiry));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
