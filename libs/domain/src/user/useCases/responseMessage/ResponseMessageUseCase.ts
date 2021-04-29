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
} from '../../../shared';
import { IMessageRepo, Message, MessageContent } from '../../domain';
import { MessageNotExistError } from './ResponseMessageError';
import { DTOMessage, createDTOMessageFromDomain } from '../DTOMessage';

type ResponseMessageArg = {
  originalMessageId: string;
  text: string;
};

type ResponseMessageResponse = Either<
  MessageNotExistError | InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOMessage>
>;

export class ResponseMessageUseCase
  implements IUseCase<ResponseMessageArg, Promise<ResponseMessageResponse>> {
  constructor(private MessageRepo: IMessageRepo) {
    this.MessageRepo = MessageRepo;
  }
  public async execute(arg: ResponseMessageArg): Promise<ResponseMessageResponse> {
    try {
      // console.log('arg:', arg);
      const originId = UniqueEntityId.reconstruct(arg.originalMessageId);
      if (originId.isFailure) return left(new InvalidInputValueError(originId.getErrorValue()));

      const originalMessage = await this.MessageRepo.getMessage(originId.getValue());
      if (originalMessage == false) return left(new MessageNotExistError());
      // console.log('origin:', originalMessage);

      const contentOrError = MessageContent.create({ text: arg.text });
      if (contentOrError.isFailure) return left(new InvalidInputValueError('不正な内容です'));

      const newRes = Message.createResponse(originalMessage, contentOrError.getValue());
      // console.log('newRes:', newRes);

      const dbResult = await this.MessageRepo.registerMessage(newRes.getValue());

      const dtoMessage = createDTOMessageFromDomain(dbResult);
      return right(Result.success<DTOMessage>(dtoMessage));
    } catch (err) {
      if (err == Error('データベースエラー')) return left(new StoreConnectionError());
      return left(new UnexpectedError(err));
    }
  }
}
