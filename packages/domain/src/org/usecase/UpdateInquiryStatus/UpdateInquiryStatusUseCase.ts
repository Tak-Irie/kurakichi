import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  NotExistError,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IInquiryRepo } from "../../domain";
import { InquiryStatus } from "../../domain/InquiryStatus";
import { DTOInquiry, createDTOInquiryFromDomain } from "../DTOInquiry";

type UpdateInquiryStatusArg = { inquiryId: string; inquiryStatus: string };

type UpdateInquiryStatusResponse = Either<
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOInquiry>
>;

export class UpdateInquiryStatusUsecase
  implements
    IUsecase<UpdateInquiryStatusArg, Promise<UpdateInquiryStatusResponse>>
{
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(
    arg: UpdateInquiryStatusArg
  ): Promise<UpdateInquiryStatusResponse> {
    try {
      const isInquiryId = UniqueEntityId.createFromArg({ id: arg.inquiryId });
      if (isInquiryId === false)
        return left(new InvalidInputValueError("wip", ""));

      const statusOrError = InquiryStatus._create(arg.inquiryStatus);
      if (statusOrError.isFailure)
        return left(
          new InvalidInputValueError(statusOrError.getErrorValue(), "")
        );

      const dbResult = await this.InquiryRepo.updateInquiryStatus(
        isInquiryId,
        statusOrError.getValue()
      );

      const dtoInquiry = createDTOInquiryFromDomain(dbResult);
      // console.log('dtoInquiryInUpdateInqUC:', dtoInquiry);

      return right(Result.success<DTOInquiry>(dtoInquiry));
    } catch (err) {
      if (err === Error("データベースエラー"))
        return left(new StoreConnectionError(""));
      return left(new UnexpectedError(""));
    }
  }
}
