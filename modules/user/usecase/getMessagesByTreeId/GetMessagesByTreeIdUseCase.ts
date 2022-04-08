import {
  IUsecase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  NotExistError,
  UniqueEntityId,
} from "../../../shared";
import { IMessageRepo } from "../../../user copy/domain";
import { NotAppropriateUserError } from "./GetMessagesByTreeIdError";
import { DTOMessage, createDTOMessagesFromDomain } from "../DTOMessage";

type GetMessagesByTreeIdArg = { treeId: string; requestUserId: string };

type GetMessagesByTreeIdResponse = Either<
  | NotAppropriateUserError
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOMessage[]>
>;

export class GetMessagesByTreeIdUsecase
  implements
    IUsecase<GetMessagesByTreeIdArg, Promise<GetMessagesByTreeIdResponse>>
{
  constructor(private MessageRepo: IMessageRepo) {
    this.MessageRepo = MessageRepo;
  }
  public async execute(
    arg: GetMessagesByTreeIdArg
  ): Promise<GetMessagesByTreeIdResponse> {
    try {
      const idOrError = UniqueEntityId.reconstruct(arg.treeId);
      if (idOrError.isFailure)
        return left(new InvalidInputValueError(idOrError.getErrorValue()));

      const dbResult = await this.MessageRepo.getMessageTreeById(
        idOrError.getValue()
      );
      const valid = dbResult.some(
        (message) => message.getReceiver() === arg.requestUserId
      );
      if (valid == false) return left(new NotAppropriateUserError());

      const dtoMessage = createDTOMessagesFromDomain(dbResult);
      return right(Result.success<DTOMessage[]>(dtoMessage));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
