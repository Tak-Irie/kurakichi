import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  NotExistError,
  UniqueEntityId,
} from '../../../shared';
import { IMessageRepo } from '../../domain';
import { NotAppropriateUserError } from './GetMessageTreeError';
import { DTOMessage, createDTOMessagesFromDomain } from '../DTOMessage';

type GetMessageTreeArg = { messageId: string; requestUserId: string };

type GetMessageTreeResponse = Either<
  | NotAppropriateUserError
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOMessage[]>
>;

export class GetMessageTreeUseCase
  implements IUseCase<GetMessageTreeArg, Promise<GetMessageTreeResponse>> {
  constructor(private MessageRepo: IMessageRepo) {
    this.MessageRepo = MessageRepo;
  }
  public async execute(arg: GetMessageTreeArg): Promise<GetMessageTreeResponse> {
    try {
      const idOrError = UniqueEntityId.reconstruct(arg.messageId);
      if (idOrError.isFailure) return left(new InvalidInputValueError(idOrError.getErrorValue()));

      const dbResult = await this.MessageRepo.getMessageTreeByMessageId(idOrError.getValue());
      const valid = dbResult.some((message) => message.getReceiver() === arg.requestUserId);
      if (valid == false) return left(new NotAppropriateUserError());

      const dtoMessage = createDTOMessagesFromDomain(dbResult);
      return right(Result.success<DTOMessage[]>(dtoMessage));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
