import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IMessageRepo } from "../../domain";
import { DTOMessage, createDTOMessagesFromDomain } from "../DTOMessage";
import { NotExistsMessage } from "./GetMessageByReceiverIdError";

type GetMessagesByReceiverIdArg = { receiverId: string };

type GetMessagesByReceiverIdResponse = Either<
  | InvalidInputValueError
  | NotExistsMessage
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOMessage[]>
>;

export class GetMessagesByReceiverIdUsecase
  implements
    IUsecase<
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
      const idOrError = UniqueEntityId.createFromArg({ id: arg.receiverId });

      if (idOrError === false)
        return left(
          new InvalidInputValueError("正しい形式で入力されていません", "")
        );
      // console.log('idOrErr:', idOrError);

      const dbResultOrError = await this.MessageRepo.getMessagesByReceiverId(
        idOrError
      );
      if (dbResultOrError == false) return left(new NotExistsMessage(""));
      // console.log('dbResult:', dbResultOrError);

      const dtoMessages = createDTOMessagesFromDomain(dbResultOrError);

      return right(Result.success<DTOMessage[]>(dtoMessages));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
