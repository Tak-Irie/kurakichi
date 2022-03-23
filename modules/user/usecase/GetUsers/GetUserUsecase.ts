import {
  Either,
  left,
  Result,
  right,
  UnexpectedAppError,
} from "../../../shared/core";
import { UseCase } from "../../../shared/usecase";

import { UserRepository } from "../../domain";
import { createDTOUserFromDomain, DTOUser } from "../DTOUser";
import { UsersNotFoundError } from "./GetUsersError";

type GetUsersResponse = Either<
  UsersNotFoundError | UnexpectedAppError,
  Result<DTOUser[]>
>;

export class GetUsersUseCase
  implements UseCase<string, Promise<GetUsersResponse>>
{
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<GetUsersResponse> {
    try {
      const dbUsers = await this.userRepository.getUsers();

      if (!dbUsers[0]) return left(new UsersNotFoundError());

      const dtoUsers = dbUsers.map((user) => createDTOUserFromDomain(user));

      return right(Result.success<DTOUser[]>(dtoUsers));
    } catch (err) {
      return left(new UnexpectedAppError(err));
    }
  }
}
