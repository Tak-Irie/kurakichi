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
import { IMessageRepo, Message } from '../../domain';
import { NotFoundMessagesError } from './getMessagesError';

type MessagesArg = { userId: string };

type GetMessagesResponse = Either<
  NotFoundMessagesError | UnexpectedError | StoreConnectionError,
  Result<Message[]>
>;

export class GetMessagesUseCase implements IUseCase<MessagesArg, Promise<GetMessagesResponse>> {
  constructor(private MessagesRepo: IMessageRepo) {
    this.MessagesRepo = MessagesRepo;
  }
  public async execute(arg: MessagesArg): Promise<GetMessagesResponse> {
    try {
      const result = await this.MessagesRepo.getMessages(
        UniqueEntityId.reconstruct(arg.userId).getValue(),
      );
      if (result == false) return left(new NotFoundMessagesError());
      return right(Result.success<Message[]>(result));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
