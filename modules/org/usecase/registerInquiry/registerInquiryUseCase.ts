import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IInquiryRepo, Inquiry } from "../../domain";
import {
  InquiryCategory,
  InquiryCategoryUnion,
} from "../../domain/InquiryCategory";
import { InquiryContent } from "../../domain/InquiryContent";
import { InquiryStatusUnion, InquiryStatus } from "../../domain/InquiryStatus";
import { createDTOInquiryFromDomain, DTOInquiry } from "../DTOInquiry";
import { ReceiverNotExistError } from "./RegisterInquiryError";

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
              return result.getErrorValue();
            }),
            ""
          )
        );

      const isReceiver = UniqueEntityId.createFromArg({ id: arg.orgId });
      if (isReceiver === false)
        return left(new InvalidInputValueError("wip", ""));
      const isSender = UniqueEntityId.createFromArg({ id: arg.orgId });
      if (isSender === false)
        return left(new InvalidInputValueError("wip", ""));
      const isOrg = UniqueEntityId.createFromArg({ id: arg.orgId });
      if (isOrg === false) return left(new InvalidInputValueError("wip", ""));

      const inquiryOrError = Inquiry.create({
        category: categoryOrError.getValue(),
        status: statusOrError.getValue(),
        content: contentOrError.getValue(),
        receiver: isReceiver,
        sender: isSender,
        orgId: isOrg,
      });

      // FIXME:error handling
      const dbResult = await this.InquiryRepo.registerInquiry(
        inquiryOrError.getValue()
      );

      const dtoInquiry = createDTOInquiryFromDomain(dbResult);
      return right(Result.success<DTOInquiry>(dtoInquiry));
    } catch (err) {
      if (err === Error("データベースエラー"))
        return left(new StoreConnectionError(""));
      return left(new UnexpectedError(""));
    }
  }
}
