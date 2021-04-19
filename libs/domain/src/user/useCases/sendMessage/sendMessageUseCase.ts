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
} from '../../../shared';
import { IMessageRepo, Message, MessageContent } from '../../domain';
import { MessageStatus, MessageStatusUnion } from '../../domain/MessageStatus';
import { createDTOMessageFromDomain, DTOMessage } from '../DTOMessage';
import { ReceiverNotFoundError } from './sendMessageError';

type SendMessageArg = {
  textInput: string;
  status: MessageStatusUnion;
  senderId: string;
  receiverId: string;
};

type MessageTypes = MessageContent | MessageStatus;

type SendMessageResponse = Either<
  InvalidInputValueError | ReceiverNotFoundError | UnexpectedError | StoreConnectionError,
  Result<DTOMessage>
>;

export class SendMessageUseCase implements IUseCase<SendMessageArg, Promise<SendMessageResponse>> {
  constructor(private Repo: IMessageRepo) {
    this.Repo = Repo;
  }
  public async execute(arg: SendMessageArg): Promise<SendMessageResponse> {
    try {
      const contentOrError = MessageContent.create({ text: arg.textInput });
      const statusOrError = MessageStatus.create({ status: arg.status });
      const verifiedResults = Result.verifyResults<MessageTypes>([contentOrError, statusOrError]);

      if (verifiedResults.isFailure)
        return left(new InvalidInputValueError(verifiedResults.getErrorValue()));

      const messageOrError = Message.create({
        id: UniqueEntityId.create(),
        content: contentOrError.getValue(),
        status: statusOrError.getValue(),
        sender: UniqueEntityId.reconstruct(arg.senderId).getValue(),
        receiver: UniqueEntityId.reconstruct(arg.receiverId).getValue(),
      });
      // TODO:need create error?
      if (messageOrError.isFailure) return left(new UnexpectedError());

      const domainMessage = await this.Repo.sendMessage(messageOrError.getValue());
      if (domainMessage == false) return left(new StoreConnectionError());

      const dtoMessage = createDTOMessageFromDomain(domainMessage);

      return right(Result.success<DTOMessage>(dtoMessage));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
