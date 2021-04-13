import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidIdFormatError,
  UniqueEntityId,
} from '../../../shared';
import { IInquiryRepo, Inquiry } from '../../domain';
import { InquiryCategory, InquiryCategoryUnion } from '../../domain/InquiryCategory';
import { InquiryContent } from '../../domain/InquiryContent';
import { InquiryStatusUnion, InquiryStatus } from '../../domain/InquiryStatus';
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
  | InvalidIdFormatError
  | UnexpectedError
  | StoreConnectionError
  | Result<InquiryTypes>,
  Result<Inquiry>
>;

type InquiryTypes = InquiryCategory | InquiryContent | InquiryStatus;

export class RegisterInquiryUseCase
  implements IUseCase<InquiryArg, Promise<RegisterInquiryResponse>> {
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(arg: InquiryArg): Promise<RegisterInquiryResponse> {
    try {
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
        receiver: new UniqueEntityId(receiverId),
        sender: new UniqueEntityId(senderId),
      });
      const dbResult = await this.InquiryRepo.registerInquiry(inquiryOrError.getValue());
      if (dbResult == false) return left(new StoreConnectionError());
      return right(Result.success<Inquiry>(dbResult));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
