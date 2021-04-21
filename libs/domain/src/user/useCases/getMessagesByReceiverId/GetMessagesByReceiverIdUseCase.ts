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
import { IMessageRepo } from '../../domain';
import { DTOMessage, createDTOMessagesFromDomain } from '../DTOMessage';

type GetMessagesByReceiverIdArg = { receiverId: string };

type GetMessagesByReceiverIdResponse = Either<
  InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOMessage[]>
>;

export class GetMessagesByReceiverIdUseCase
  implements IUseCase<GetMessagesByReceiverIdArg, Promise<GetMessagesByReceiverIdResponse>> {
  constructor(private MessageRepo: IMessageRepo) {
    this.MessageRepo = MessageRepo;
  }
  public async execute(arg: GetMessagesByReceiverIdArg): Promise<GetMessagesByReceiverIdResponse> {
    try {
      const idOrError = UniqueEntityId.reconstruct(arg.receiverId);
      if (idOrError) return left(new InvalidInputValueError(idOrError.getErrorValue()));

      const dbResultOrError = await this.MessageRepo.getMessagesByReceiverId(idOrError.getValue());
      if (dbResultOrError == false) return right(Result.success<DTOMessage[]>([]));

      const dtoMessages = createDTOMessagesFromDomain(dbResultOrError);

      return right(Result.success<DTOMessage[]>(dtoMessages));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
