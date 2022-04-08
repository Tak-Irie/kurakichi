import {
  IUsecase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  UniqueEntityId,
} from "../../../shared";
import { IUserRepository } from "../../../user copy/domain";
import { createDTOUserFromDomain, DTOUser } from "../DTOUser";
import { UserNotExistError } from "./updateUserError";

type UpdateUserArg = {
  userId: string;
  description?: string;
  userName?: string;
  email?: string;
  avatar?: string;
  image?: string;
};

type UpdateUserResponse = Either<
  | InvalidInputValueError
  | UserNotExistError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOUser>
>;

export class UpdateUserUsecase
  implements IUsecase<UpdateUserArg, Promise<UpdateUserResponse>>
{
  constructor(private UserRepo: IUserRepository) {
    this.UserRepo = UserRepo;
  }
  public async execute(arg: UpdateUserArg): Promise<UpdateUserResponse> {
    const { userId, avatar, description, email, image, userName } = arg;
    try {
      const idOrError = UniqueEntityId.reconstruct(userId);
      if (idOrError.isFailure)
        return left(new InvalidInputValueError(idOrError.getErrorValue()));

      const storedUser = await this.UserRepo.getUserByUserId(
        idOrError.getValue()
      );
      if (storedUser == undefined) return left(new UserNotExistError());

      // console.log('beforeChange:', storedUser);

      if (email) {
        const result = storedUser.updateEmail(email);
        if (typeof result == "string")
          return left(new InvalidInputValueError(result));
      }

      if (userName) {
        const result = storedUser.updateUserName(userName);
        if (typeof result == "string")
          return left(new InvalidInputValueError(result));
      }

      // FIXME:create service class is better, don't you think?
      // TODO:const avatarOrError = UserAvatar.create(avatar)
      // if(avatarOrError) return left(new InvalidInputValueError(AvatarOrError.getErrorValue()))
      // do same approach to them all
      if (avatar) {
        storedUser.updateAvatar(avatar);
      }

      if (description) {
        storedUser.updateDescription(description);
      }

      if (image) {
        storedUser.updateImage(image);
      }

      // console.log('afterChange:', storedUser);
      const dbResult = await this.UserRepo.updateUser(storedUser);
      if (dbResult == false) return left(new StoreConnectionError());

      const userDTO = createDTOUserFromDomain(dbResult);

      return right(Result.success<DTOUser>(userDTO));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
