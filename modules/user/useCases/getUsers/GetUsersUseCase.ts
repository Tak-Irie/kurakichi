import {
  Either,
  IUseCase,
  left,
  Result,
  right,
  UnexpectedError,
} from "../../../shared";
import { IUserRepository } from "../../../user copy/domain";
import { createDTOUserFromDomain, DTOUser } from "../DTOUser";
import { UsersNotFoundError } from "./GetUsersErrors";

type GetUsersResponse = Either<
  UsersNotFoundError | UnexpectedError,
  Result<DTOUser[]>
>;

export class GetUsersUseCase
  implements IUseCase<string, Promise<GetUsersResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<GetUsersResponse> {
    try {
      const dbUsers = await this.userRepository.getUsers();

      if (dbUsers == false) return left(new UsersNotFoundError());

      const dtoUsers = dbUsers.map((user) => createDTOUserFromDomain(user));

      return right(Result.success<DTOUser[]>(dtoUsers));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
