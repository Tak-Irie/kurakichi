import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IMessageRepo, Message, MessageContent } from "../../domain";
import { MessageStatus } from "../../domain/MessageStatus";
import {
  NotFoundReceiverError,
  NotValidContentError,
} from "./SendMessageError";
import { DTOMessage, createDTOMessageFromDomain } from "../DTOMessage";

type SendMessageArg = {
  textInput: string;
  senderId: string;
  receiverId: string;
};

type MessageTypes = MessageContent | MessageStatus;

type SendMessageResponse = Either<
  | InvalidInputValueError
  | NotFoundReceiverError
  | NotValidContentError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOMessage>
>;

export class SendMessageUsecase
  implements IUsecase<SendMessageArg, Promise<SendMessageResponse>>
{
  constructor(private Repo: IMessageRepo) {
    this.Repo = Repo;
  }
  public async execute(arg: SendMessageArg): Promise<SendMessageResponse> {
    try {
      const contentOrError = MessageContent.create({ text: arg.textInput });
      const verifiedResults = Result.verifyResults<MessageTypes>([
        contentOrError,
      ]);

      if (verifiedResults[0].isFailure)
        return left(
          new InvalidInputValueError(
            verifiedResults.map((result) => {
              return result.getErrorValue();
            }),
            ""
          )
        );

      const isSender = UniqueEntityId.createFromArg({ id: arg.senderId });
      if (isSender === false)
        return left(new InvalidInputValueError("wip", ""));
      const isReceiver = UniqueEntityId.createFromArg({ id: arg.receiverId });
      if (isReceiver === false)
        return left(new InvalidInputValueError("wip", ""));

      const messageOrError = Message.create({
        content: contentOrError.getValue(),
        sender: isSender,
        receiver: isReceiver,
      });
      // TODO:need create error?
      if (messageOrError.isFailure) return left(new UnexpectedError(""));
      // console.log('messOrErr:', messageOrError);

      const domainMessage = await this.Repo.registerMessage(
        messageOrError.getValue()
      );
      // console.log('domMess:', domainMessage);

      const dtoMessage = createDTOMessageFromDomain(domainMessage);

      return right(Result.success<DTOMessage>(dtoMessage));
    } catch (err: any) {
      if (err.message === "データベースエラー")
        return left(new StoreConnectionError(""));
      return left(new UnexpectedError(""));
    }
  }
}
