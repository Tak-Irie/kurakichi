import {
  IUsecase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  UniqueEntityId,
} from "../../../shared";
import { IInquiryRepo, Inquiry } from "../../domain";
import {
  InquiryCategory,
  InquiryCategoryUnion,
} from "../../domain/InquiryCategory";
import { InquiryContent } from "../../domain/InquiryContent";
import { InquiryStatusUnion, InquiryStatus } from "../../domain/InquiryStatus";
import { createDTOInquiryFromDomain, DTOInquiry } from "../DTOInquiry";
import { ReceiverNotExistError } from "./registerInquiryError";

type InquiryArg = {
  category: InquiryCategoryUnion;
  status: InquiryStatusUnion;
  content: string;
  receiverId: string;
  senderId: string;
  orgId: string;
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

export class RegisterInquiryUsecase
  implements IUsecase<InquiryArg, Promise<RegisterInquiryResponse>>
{
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(arg: InquiryArg): Promise<RegisterInquiryResponse> {
    try {
      // console.log('registerInquiryArg:', arg);
      const { category, content, receiverId, senderId, status, orgId } = arg;
      const categoryOrError = InquiryCategory.create({ type: category });
      const contentOrError = InquiryContent.create({ text: content });
      const statusOrError = InquiryStatus.create({ status: status });

      const verifiedResult = Result.verifyResults<InquiryTypes>([
        categoryOrError,
        contentOrError,
        statusOrError,
      ]);
      if (verifiedResult[0].isFailure)
        return left(
          new InvalidInputValueError(
            verifiedResult.map((result) => {
              if (result.isFailure) {
                return result.getErrorValue();
              }
              return undefined;
            })
          )
        );

      const inquiryOrError = Inquiry.create({
        category: categoryOrError.getValue(),
        status: statusOrError.getValue(),
        content: contentOrError.getValue(),
        receiver: UniqueEntityId.reconstruct(receiverId).getValue(),
        sender: UniqueEntityId.reconstruct(senderId).getValue(),
        orgId: UniqueEntityId.reconstruct(orgId).getValue(),
      });

      const dbResult = await this.InquiryRepo.registerInquiry(
        inquiryOrError.getValue()
      );

      const dtoInquiry = createDTOInquiryFromDomain(dbResult);
      return right(Result.success<DTOInquiry>(dtoInquiry));
    } catch (err) {
      if (err === Error("データベースエラー"))
        return left(new StoreConnectionError());
      return left(new UnexpectedError(err));
    }
  }
}
