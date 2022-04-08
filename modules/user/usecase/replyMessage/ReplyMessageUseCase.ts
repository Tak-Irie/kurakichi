import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  UniqueEntityId,
} from "../../../shared";
import {
  IMessageRepo,
  Message,
  MessageContent,
} from "../../../user copy/domain";
import { MessageNotExistError } from "./ReplyMessageError";
import { DTOMessage, createDTOMessageFromDomain } from "../DTOMessage";

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

export class ReplyMessageUseCase
  implements IUseCase<ReplyMessageArg, Promise<ReplyMessageResponse>>
{
  constructor(private MessageRepo: IMessageRepo) {
    this.MessageRepo = MessageRepo;
  }
  public async execute(arg: ReplyMessageArg): Promise<ReplyMessageResponse> {
    try {
      // console.log('arg:', arg);
      const replyTargetIdOrErr = UniqueEntityId.reconstruct(arg.replyTargetId);
      if (replyTargetIdOrErr.isFailure)
        return left(
          new InvalidInputValueError(replyTargetIdOrErr.getErrorValue())
        );

      const replyTarget = await this.MessageRepo.getMessage(
        replyTargetIdOrErr.getValue()
      );
      if (replyTarget == false) return left(new MessageNotExistError());

      const contentOrError = MessageContent.create({ text: arg.content });
      if (contentOrError.isFailure)
        return left(new InvalidInputValueError("不正な内容です"));

      const reply = Message.createReply(replyTarget, contentOrError.getValue());
      // console.log('newRes:', newRes);

      const dbResult = await this.MessageRepo.registerMessage(reply.getValue());

      const dtoMessage = createDTOMessageFromDomain(dbResult);
      return right(Result.success<DTOMessage>(dtoMessage));
    } catch (err) {
      if (err == Error("データベースエラー"))
        return left(new StoreConnectionError());
      return left(new UnexpectedError(err));
    }
  }
}
