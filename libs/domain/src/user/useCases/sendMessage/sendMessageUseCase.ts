import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
} from '../../../shared';
import { IMessageRepo, Message, MessageContent } from '../../domain';
import { ContentInvalidError, ReceiverNotFoundError } from './sendMessageError';

type Arg = { textInput: string; senderId: string; receiverId: string };

type SendMessageResponse = Either<
  ContentInvalidError | ReceiverNotFoundError | UnexpectedError | StoreConnectionError,
  Result<Message>
>;

export class SendMessageUseCase implements IUseCase<Arg, Promise<SendMessageResponse>> {
  constructor(private Repo: IMessageRepo) {
    this.Repo = Repo;
  }
  public async execute(arg: Arg): Promise<SendMessageResponse> {
    try {
      const contentOrError = MessageContent.create({ text: arg.textInput });

      const content = Result.verifyResult<MessageContent>(contentOrError);

      if (content.isFailure) return left(new ContentInvalidError(arg.textInput));

      const messageOrError = Message.create({
        id: UniqueEntityId.create(),
        content: content.getValue(),
        sender: new UniqueEntityId(arg.senderId),
        receiver: new UniqueEntityId(arg.receiverId),
      });
      // TODO:need create error?
      if (messageOrError.isFailure) return left(new UnexpectedError());

      const result = await this.Repo.sendMessage(messageOrError.getValue());

      if (result == false) return left(new StoreConnectionError());

      return right(Result.success<Message>(result));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
