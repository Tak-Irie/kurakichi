import { Either, left, Result, right } from "../../../shared/core";
import { UserNotFoundError } from "./GetUserByIdErrors";

import { DTOUser, createDTOUserFromDomain } from "../DTOUser";
import {
  InvalidInputValueError,
  IUsecase,
  UnexpectedError,
} from "../../../shared/usecase";
import { IUserRepository } from "../../domain";
import { UniqueEntityId } from "../../../shared/domain";

type GetUserByIdResponse = Either<
  UserNotFoundError | UnexpectedError | InvalidInputValueError,
  Result<DTOUser>
>;

type GetUserByIdArg = {
  id: string;
};

export class GetUserByIdUsecase
  implements IUsecase<GetUserByIdArg, Promise<GetUserByIdResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(arg: GetUserByIdArg): Promise<GetUserByIdResponse> {
    try {
      const idOrErr = UniqueEntityId.createFromArg(arg);
      if (idOrErr === false) {
        return left(
          new InvalidInputValueError("正しい形式で入力されていません", "")
        );
      }
      const dbResult = await this.userRepository.getUserByUserId(idOrErr);

      if (dbResult === undefined) return left(new UserNotFoundError(""));

      const dtoUser = createDTOUserFromDomain(dbResult);
      return right(Result.success<DTOUser>(dtoUser));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
