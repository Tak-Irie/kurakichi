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
import { IMessageRepo } from "../../../user copy/domain";
import { DTOMessage, createDTOMessagesFromDomain } from "../DTOMessage";

type GetMessagesByReceiverIdArg = { receiverId: string };

type GetMessagesByReceiverIdResponse = Either<
  InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOMessage[]>
>;

export class GetMessagesByReceiverIdUseCase
  implements
    IUseCase<
      GetMessagesByReceiverIdArg,
      Promise<GetMessagesByReceiverIdResponse>
    >
{
  constructor(private MessageRepo: IMessageRepo) {
    this.MessageRepo = MessageRepo;
  }
  public async execute(
    arg: GetMessagesByReceiverIdArg
  ): Promise<GetMessagesByReceiverIdResponse> {
    try {
      // console.log('getMessagesByReceiverIdArg:', arg);
      const idOrError = UniqueEntityId.reconstruct(arg.receiverId);
      if (idOrError.isFailure)
        return left(new InvalidInputValueError(idOrError.getErrorValue()));
      // console.log('idOrErr:', idOrError);

      const dbResultOrError = await this.MessageRepo.getMessagesByReceiverId(
        idOrError.getValue()
      );
      if (dbResultOrError == false)
        return right(Result.success<DTOMessage[]>([]));
      // console.log('dbResult:', dbResultOrError);

      const dtoMessages = createDTOMessagesFromDomain(dbResultOrError);

      return right(Result.success<DTOMessage[]>(dtoMessages));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
