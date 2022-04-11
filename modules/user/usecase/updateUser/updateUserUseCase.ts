import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IUserRepository } from "../../domain";
import { createDTOUserFromDomain, DTOUser } from "../DTOUser";
import { NotFoundUserError } from "./updateUserError";

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
  | NotFoundUserError
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
      const idOrError = UniqueEntityId.createFromArg({ id: userId });
      if (idOrError === false)
        return left(
          new InvalidInputValueError("IDの形式が正しく有りません", "")
        );

      const storedUser = await this.UserRepo.getUserByUserId(idOrError);
      if (storedUser == undefined) return left(new NotFoundUserError(""));

      // console.log('beforeChange:', storedUser);

      if (email) {
        const result = storedUser.updateEmail(email);
        if (typeof result == "string")
          return left(
            new InvalidInputValueError("正しい形式を満たしていません", "")
          );
      }

      if (userName) {
        const result = storedUser.updateUserName(userName);
        if (typeof result == "string")
          return left(new InvalidInputValueError(result, ""));
      }

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
      if (dbResult == false) return left(new StoreConnectionError(""));

      const userDTO = createDTOUserFromDomain(dbResult);

      return right(Result.success<DTOUser>(userDTO));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
