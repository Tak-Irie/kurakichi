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
import { createDTOInquiryFromDomain, DTOInquiry } from "../DTOInquiry";

type InquiryArg = { inquiryId: string };

type GetInquiryResponse = Either<
  NotExistError | UnexpectedError | StoreConnectionError,
  Result<DTOInquiry>
>;

export class GetInquiryUsecase
  implements IUsecase<InquiryArg, Promise<GetInquiryResponse>>
{
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(arg: InquiryArg): Promise<GetInquiryResponse> {
    try {
      const isId = UniqueEntityId.createFromArg({ id: arg.inquiryId });
      if (isId === false) return left(new InvalidInputValueError("wip", ""));

      const dbResult = await this.InquiryRepo.getInquiry(isId);
      if (dbResult == false) return left(new StoreConnectionError(""));

      const dtoInquiry = createDTOInquiryFromDomain(dbResult);
      return right(Result.success<DTOInquiry>(dtoInquiry));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
