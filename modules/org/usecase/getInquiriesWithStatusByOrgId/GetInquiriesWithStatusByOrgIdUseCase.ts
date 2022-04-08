import {
  IUsecase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  NotExistError,
  UniqueEntityId,
} from "../../../shared";
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
      let cursor: UniqueEntityId | undefined;

      const idOrErr = UniqueEntityId.reconstruct(arg.orgId);
      if (idOrErr.isFailure)
        return left(new InvalidInputValueError(idOrErr.getErrorValue()));

      const statusOrErr = InquiryStatus.create({ status: arg.status });
      if (statusOrErr.isFailure)
        return left(new InvalidInputValueError(statusOrErr.getErrorValue()));

      if (arg.endCursor) {
        const endCursorOrErr = UniqueEntityId.reconstruct(arg.endCursor);
        if (endCursorOrErr.isFailure)
          return left(
            new InvalidInputValueError(endCursorOrErr.getErrorValue())
          );
        cursor = endCursorOrErr.getValue();
      }

      // console.log('statusOrErr:', statusOrErr.getValue());

      const dbResult = await this.InquiryRepo.getInquiriesWithStatusByOrgId(
        idOrErr.getValue(),
        statusOrErr.getValue(),
        arg.limit,
        cursor
      );
      if (dbResult == false)
        return left(new NotExistError("該当メッセージはありません"));

      const dtoInquiries = createDTOInquiriesFromDomain(dbResult);
      // console.log('dtoInquiriesInUC:', dtoInquiries);
      return right(Result.success<DTOInquiry[]>(dtoInquiries));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
