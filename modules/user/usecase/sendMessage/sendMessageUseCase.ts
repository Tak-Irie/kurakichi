import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
  InvalidInputValueError,
} from "../../../shared";
import {
  IMessageRepo,
  Message,
  MessageContent,
} from "../../../user copy/domain";
import { MessageStatus } from "../../../user copy/domain/MessageStatus";
import { createDTOMessageFromDomain, DTOMessage } from "../DTOMessage";
import { ReceiverNotFoundError } from "./sendMessageError";

type SendMessageArg = {
  textInput: string;
  senderId: string;
  receiverId: string;
};

type MessageTypes = MessageContent | MessageStatus;

type SendMessageResponse = Either<
  | InvalidInputValueError
  | ReceiverNotFoundError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOMessage>
>;

export class SendMessageUseCase
  implements IUseCase<SendMessageArg, Promise<SendMessageResponse>>
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
              if (result.isFailure) {
                return result.getErrorValue();
              }
              return undefined;
            })
          )
        );

      const messageOrError = Message.create({
        content: contentOrError.getValue(),
        sender: UniqueEntityId.reconstruct(arg.senderId).getValue(),
        receiver: UniqueEntityId.reconstruct(arg.receiverId).getValue(),
      });
      // TODO:need create error?
      if (messageOrError.isFailure) return left(new UnexpectedError());
      // console.log('messOrErr:', messageOrError);

      const domainMessage = await this.Repo.registerMessage(
        messageOrError.getValue()
      );
      // console.log('domMess:', domainMessage);

      const dtoMessage = createDTOMessageFromDomain(domainMessage);

      return right(Result.success<DTOMessage>(dtoMessage));
    } catch (err) {
      if (err.message === "データベースエラー")
        return left(new StoreConnectionError());
      return left(new UnexpectedError(err));
    }
  }
}
