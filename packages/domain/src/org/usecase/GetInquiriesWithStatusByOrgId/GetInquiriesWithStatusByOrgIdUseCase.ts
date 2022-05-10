import { Either, left, Nothing, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  NotExistError,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IInquiryRepo } from "../../domain";
import { InquiryStatus, InquiryStatusUnion } from "../../domain/InquiryStatus";
import { DTOInquiry, createDTOInquiriesFromDomain } from "../DTOInquiry";

type GetInquiriesWithStatusByOrgIdArg = {
  orgId: string;
  status: InquiryStatusUnion;
  limit: number;
  endCursor?: string;
};

type GetInquiriesWithUnreadByOrgIdResponse = Either<
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOInquiry[]>
>;

export class GetInquiriesWithStatusByOrgIdUsecase
  implements
    IUsecase<
      GetInquiriesWithStatusByOrgIdArg,
      Promise<GetInquiriesWithUnreadByOrgIdResponse>
    >
{
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(
    arg: GetInquiriesWithStatusByOrgIdArg
  ): Promise<GetInquiriesWithUnreadByOrgIdResponse> {
    try {
      // console.log('args:', arg);
      let cursor: UniqueEntityId | Nothing = "";

      const idOrErr = UniqueEntityId.createFromArg({ id: arg.orgId });
      if (idOrErr === false) return left(new InvalidInputValueError("wip", ""));

      const statusOrErr = InquiryStatus.create({ status: arg.status });
      if (statusOrErr.isFailure)
        return left(new InvalidInputValueError("wip", ""));

      if (arg.endCursor) {
        const endCursorOrErr = UniqueEntityId.createFromArg({
          id: arg.endCursor,
        });
        if (endCursorOrErr === false)
          return left(new InvalidInputValueError("wip", ""));
        cursor = endCursorOrErr;
      }

      // console.log('statusOrErr:', statusOrErr.getValue());

      const dbResult = await this.InquiryRepo.getInquiriesWithStatusByOrgId(
        idOrErr,
        statusOrErr.getValue(),
        arg.limit,
        cursor ? cursor : ""
      );
      if (dbResult == false)
        return left(new NotExistError("該当メッセージはありません", ""));

      const dtoInquiries = createDTOInquiriesFromDomain(dbResult);
      // console.log('dtoInquiriesInUC:', dtoInquiries);
      return right(Result.success<DTOInquiry[]>(dtoInquiries));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
