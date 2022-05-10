import { Either, left, Nothing, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IInquiryRepo } from "../../domain";
import { createDTOInquiriesFromDomain, DTOInquiry } from "../DTOInquiry";

type InquiriesArg = {
  orgId: string;
  limit: number;
  endCursor: string | Nothing;
};

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
      let cursor: UniqueEntityId | Nothing = "";

      const isId = UniqueEntityId.createFromArg({ id: arg.orgId });
      if (isId === false) return left(new InvalidInputValueError("wip", ""));

      if (arg.endCursor) {
        const isId = UniqueEntityId.createFromArg({ id: arg.orgId });
        if (isId === false) return left(new InvalidInputValueError("wip", ""));
        cursor = isId;
      }

      const dbInquiries = await this.InquiriesRepo.getInquiriesByOrgId(
        isId,
        arg.limit,
        cursor ? cursor : ""
      );
      if (dbInquiries == false) return right(Result.success<DTOInquiry[]>([]));

      const dtoInquiries = createDTOInquiriesFromDomain(dbInquiries);
      return right(Result.success<DTOInquiry[]>(dtoInquiries));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
