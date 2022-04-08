import {
  Either,
  InvalidInputValueError,
  IUsecase,
  left,
  Result,
  right,
  UnexpectedError,
  UniqueEntityId,
} from "../../../shared";
import { IUserRepository } from "../../../user copy/domain";
import { DTOUser, createDTOUserFromDomain } from "../DTOUser";
import * as GetUserByIdErrors from "./GetUserByIdErrors";

type GetUserByIdResponse = Either<
  | GetUserByIdErrors.UserNotFoundError
  | UnexpectedError
  | InvalidInputValueError,
  Result<DTOUser>
>;

export class GetUserByIdUsecase
  implements IUsecase<string, Promise<GetUserByIdResponse>>
{
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(userId: string): Promise<GetUserByIdResponse> {
    try {
      const idOrErr = UniqueEntityId.reconstruct(userId);
      if (idOrErr.isFailure)
        return left(new InvalidInputValueError(idOrErr.getErrorValue()));

      const dbResult = await this.userRepository.getUserByUserId(
        UniqueEntityId.reconstruct(userId).getValue()
      );

      if (dbResult === undefined)
        return left(new GetUserByIdErrors.UserNotFoundError(userId));

      const dtoUser = createDTOUserFromDomain(dbResult);
      return right(Result.success<DTOUser>(dtoUser));
    } catch (err) {
      return left(new UnexpectedError());
    }
  }
}
