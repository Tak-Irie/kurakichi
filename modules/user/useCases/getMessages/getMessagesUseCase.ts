import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
} from "../../../shared";
import { IMessageRepo } from "../../../user copy/domain";
import { createDTOMessagesFromDomain, DTOMessage } from "../DTOMessage";
import { NotFoundMessagesError } from "./getMessagesError";

type MessagesArg = { userId: string };

type GetMessagesResponse = Either<
  NotFoundMessagesError | UnexpectedError | StoreConnectionError,
  Result<DTOMessage[]>
>;

export class GetMessagesUseCase
  implements IUseCase<MessagesArg, Promise<GetMessagesResponse>>
{
  constructor(private MessagesRepo: IMessageRepo) {
    this.MessagesRepo = MessagesRepo;
  }
  public async execute(arg: MessagesArg): Promise<GetMessagesResponse> {
    try {
      const domainMessages = await this.MessagesRepo.getMessages(
        UniqueEntityId.reconstruct(arg.userId).getValue()
      );
      if (domainMessages == false) return left(new NotFoundMessagesError());

      const dtoMessages = createDTOMessagesFromDomain(domainMessages);

      return right(Result.success<DTOMessage[]>(dtoMessages));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
