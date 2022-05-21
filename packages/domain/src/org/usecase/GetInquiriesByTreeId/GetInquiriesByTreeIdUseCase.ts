import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  NotExistError,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IInquiryRepo, IOrgRepo } from "../../domain";
import { NotAppropriateUserError } from "./GetInquiriesByTreeIdError";
import { createDTOInquiriesFromDomain, DTOInquiry } from "../DTOInquiry";

type GetInquiriesByTreeIdArg = { treeId: string; requestUserId: string };

type GetInquiriesByTreeIdResponse = Either<
  | NotAppropriateUserError
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOInquiry[]>
>;

export class GetInquiriesByTreeIdUsecase
  implements
    IUsecase<GetInquiriesByTreeIdArg, Promise<GetInquiriesByTreeIdResponse>>
{
  constructor(private InquiryRepo: IInquiryRepo, private OrgRepo: IOrgRepo) {
    this.InquiryRepo = InquiryRepo;
    this.OrgRepo = OrgRepo;
  }
  public async execute(
    arg: GetInquiriesByTreeIdArg
  ): Promise<GetInquiriesByTreeIdResponse> {
    try {
      const treeIdOrError = UniqueEntityId.createFromArg({ id: arg.treeId });
      if (treeIdOrError === false)
        return left(new InvalidInputValueError("wip", ""));

      const userIdOrError = UniqueEntityId.createFromArg({
        id: arg.requestUserId,
      });
      if (userIdOrError === false)
        return left(new InvalidInputValueError("wip", ""));

      const dbInquiries = await this.InquiryRepo.getInquiryTreeById(
        treeIdOrError
      );
      if (dbInquiries == false)
        return left(new NotExistError("お問い合わせが存在しません", ""));

      const orgId = UniqueEntityId.restoreFromRepo({
        id: dbInquiries[0].getReceivedOrg(),
      });

      // FIXME:
      const valid = await this.OrgRepo.confirmMemberExistence(
        orgId,
        userIdOrError
      );
      if (valid == false) return left(new NotAppropriateUserError(""));

      const dtoInquiries = createDTOInquiriesFromDomain(dbInquiries);
      return right(Result.success<DTOInquiry[]>(dtoInquiries));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
