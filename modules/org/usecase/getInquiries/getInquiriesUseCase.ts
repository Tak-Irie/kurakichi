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
import { IInquiryRepo } from "../../domain";
import { createDTOInquiriesFromDomain, DTOInquiry } from "../DTOInquiry";

type InquiriesArg = { orgId: string; limit: number; endCursor?: string };

type GetInquiriesResponse = Either<
  InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOInquiry[]>
>;

export class GetInquiriesUsecase
  implements IUsecase<InquiriesArg, Promise<GetInquiriesResponse>>
{
  constructor(private InquiriesRepo: IInquiryRepo) {
    this.InquiriesRepo = InquiriesRepo;
  }
  public async execute(arg: InquiriesArg): Promise<GetInquiriesResponse> {
    try {
      let cursor: UniqueEntityId | undefined;
      const idOrErr = UniqueEntityId.reconstruct(arg.orgId);
      if (idOrErr.isFailure)
        return left(new InvalidInputValueError(idOrErr.getErrorValue()));

      if (arg.endCursor) {
        const endCursorOrErr = UniqueEntityId.reconstruct(arg.endCursor);
        if (endCursorOrErr.isFailure)
          return left(
            new InvalidInputValueError(endCursorOrErr.getErrorValue())
          );
        cursor = endCursorOrErr.getValue();
      }

      const dbInquiries = await this.InquiriesRepo.getInquiriesByOrgId(
        idOrErr.getValue(),
        arg.limit,
        cursor
      );
      if (dbInquiries == false) return right(Result.success<DTOInquiry[]>([]));

      const dtoInquiries = createDTOInquiriesFromDomain(dbInquiries);
      return right(Result.success<DTOInquiry[]>(dtoInquiries));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
