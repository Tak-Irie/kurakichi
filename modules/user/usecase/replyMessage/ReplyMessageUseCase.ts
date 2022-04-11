import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IMessageRepo, Message, MessageContent } from "../../domain";
import { DTOMessage, createDTOMessageFromDomain } from "../DTOMessage";
import { MessageNotExistError } from "./ReplyMessageError";

type ReplyMessageArg = {
  replyTargetId: string;
  content: string;
};

type ReplyMessageResponse = Either<
  | MessageNotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOMessage>
>;

export class ReplyMessageUsecase
  implements IUsecase<ReplyMessageArg, Promise<ReplyMessageResponse>>
{
  constructor(private MessageRepo: IMessageRepo) {
    this.MessageRepo = MessageRepo;
  }
  public async execute(arg: ReplyMessageArg): Promise<ReplyMessageResponse> {
    try {
      // console.log('arg:', arg);
      const replyTargetIdOrErr = UniqueEntityId.createFromArg({
        id: arg.replyTargetId,
      });
      if (replyTargetIdOrErr === false)
        return left(new InvalidInputValueError("wip", ""));

      const replyTarget = await this.MessageRepo.getMessage(replyTargetIdOrErr);

      if (replyTarget == false) return left(new MessageNotExistError(""));

      const contentOrError = MessageContent.create({ text: arg.content });
      if (contentOrError.isFailure)
        return left(new InvalidInputValueError("不正な内容です", ""));

      const reply = Message.createReply(replyTarget, contentOrError.getValue());
      // console.log('newRes:', newRes);

      const dbResult = await this.MessageRepo.registerMessage(reply.getValue());

      const dtoMessage = createDTOMessageFromDomain(dbResult);
      return right(Result.success<DTOMessage>(dtoMessage));
    } catch (err) {
      if (err == Error("データベースエラー"))
        return left(new StoreConnectionError(""));
      return left(new UnexpectedError(""));
    }
  }
}
