import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IMessageRepo } from "../../domain";
import { createDTOMessagesFromDomain, DTOMessage } from "../DTOMessage";
import { NotFoundMessagesError } from "./GetMessagesError";

type MessagesArg = { userId: string };

type GetMessagesResponse = Either<
  NotFoundMessagesError | UnexpectedError | StoreConnectionError,
  Result<DTOMessage[]>
>;

export class GetMessagesUsecase
  implements IUsecase<MessagesArg, Promise<GetMessagesResponse>>
{
  constructor(private MessagesRepo: IMessageRepo) {
    this.MessagesRepo = MessagesRepo;
  }
  public async execute(arg: MessagesArg): Promise<GetMessagesResponse> {
    try {
      const isId = UniqueEntityId.createFromArg({ id: arg.userId });
      if (isId === false) return left(new InvalidInputValueError("wip", ""));

      const domainMessages = await this.MessagesRepo.getMessages(isId);
      if (domainMessages == false) return left(new NotFoundMessagesError(""));

      const dtoMessages = createDTOMessagesFromDomain(domainMessages);

      return right(Result.success<DTOMessage[]>(dtoMessages));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
