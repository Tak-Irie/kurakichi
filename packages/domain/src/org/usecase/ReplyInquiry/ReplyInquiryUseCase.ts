import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  NotExistError,
  StoreConnectionError,
  UnexpectedError
} from "../../../shared/usecase";
import { IInquiryRepo, Inquiry, InquiryContent } from "../../domain";
import { createDTOInquiryFromDomain, DTOInquiry } from "../DTOInquiry";

type ReplyInquiryArg = {
  replyTargetId: string;
  senderId: string;
  content: string;
};

type ReplyInquiryResponse = Either<
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOInquiry>
>;

export class ReplyInquiryUsecase
  implements IUsecase<ReplyInquiryArg, Promise<ReplyInquiryResponse>>
{
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(arg: ReplyInquiryArg): Promise<ReplyInquiryResponse> {
    try {
      // console.log('arg:', arg);
      const isTargetId = UniqueEntityId.createFromArg({
        id: arg.replyTargetId,
      });
      if (isTargetId === false)
        return left(new InvalidInputValueError("wip", ""));

      const isSenderId = UniqueEntityId.createFromArg({
        id: arg.replyTargetId,
      });
      if (isSenderId === false)
        return left(new InvalidInputValueError("wip", ""));

      const replyTarget = await this.InquiryRepo.getInquiry(isTargetId);
      if (replyTarget == false)
        return left(new NotExistError("問い合わせが存在しません", ""));

      const contentOrError = InquiryContent.create({ content: arg.content });
      if (contentOrError.isFailure)
        return left(new InvalidInputValueError("不正な内容です", ""));

      const reply = Inquiry.createReply(
        replyTarget,
        contentOrError.getValue(),
        isSenderId
      );
      // console.log('replyInq:', reply);

      const dbInquiry = await this.InquiryRepo.registerInquiry(
        reply.getValue()
      );

      const dtoInquiry = createDTOInquiryFromDomain(dbInquiry);
      return right(Result.success<DTOInquiry>(dtoInquiry));
    } catch (err) {
      if (err == Error("データベースエラー"))
        return left(new StoreConnectionError(""));
      return left(new UnexpectedError(""));
    }
  }
}
