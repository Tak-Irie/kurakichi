import {
  NotAppropriateUserError,
  NotExistsMessageByTreeId,
} from "./GetMessagesByTreeIdError";
import { DTOMessage, createDTOMessagesFromDomain } from "../DTOMessage";
import { Either, left, Result, right } from "../../../shared/core";
import {
  InvalidInputValueError,
  IUsecase,
  NotExistError,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IMessageRepo } from "../../domain";
import { UniqueEntityId } from "../../../shared/domain";

type GetMessagesByTreeIdArg = { treeId: string; requestUserId: string };

type GetMessagesByTreeIdResponse = Either<
  | NotAppropriateUserError
  | NotExistsMessageByTreeId
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
      const idOrError = UniqueEntityId.createFromArg({ id: arg.treeId });
      if (idOrError === false)
        return left(
          new InvalidInputValueError("正しい形式で入力されていません", "")
        );

      const dbResult = await this.MessageRepo.getMessageTreeById(idOrError);
      if (dbResult === false) {
        return left(new NotExistsMessageByTreeId(""));
      }

      const valid = dbResult.some(
        (message) => message.getReceiver() === arg.requestUserId
      );
      if (valid == false) return left(new NotAppropriateUserError(""));

      const dtoMessage = createDTOMessagesFromDomain(dbResult);
      return right(Result.success<DTOMessage[]>(dtoMessage));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
