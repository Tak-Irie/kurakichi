import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  UniqueEntityId,
} from '../../../shared';
import { IUserRepository, UserEmail } from '../../domain';
import { createDTOUserFromDomain, DTOUser } from '../DTOUser';
import { UserNotExistError } from './updateUserError';

type UpdateUserArg = {
  userId: string;
  description?: string;
  email?: string;
  avatar?: string;
  image?: string;
};

type UpdateUserResponse = Either<
  InvalidInputValueError | UserNotExistError | UnexpectedError | StoreConnectionError,
  Result<DTOUser>
>;

export class UpdateUserUseCase implements IUseCase<UpdateUserArg, Promise<UpdateUserResponse>> {
  constructor(private UserRepo: IUserRepository) {
    this.UserRepo = UserRepo;
  }
  public async execute(arg: UpdateUserArg): Promise<UpdateUserResponse> {
    const { userId, avatar, description, email, image } = arg;
    try {
      const idOrError = UniqueEntityId.reconstruct(userId);
      if (idOrError.isFailure) return left(new InvalidInputValueError(idOrError.getErrorValue()));

      const storedUser = await this.UserRepo.getUserByUserId(idOrError.getValue());
      if (storedUser == undefined) return left(new UserNotExistError());

      console.log('beforeChange:', storedUser);

      if (email) {
        const emailOrError = UserEmail.create({ email });
        if (emailOrError.isFailure)
          return left(new InvalidInputValueError(emailOrError.getErrorValue()));
        storedUser.updateEmail(emailOrError.getValue());
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

      console.log('afterChange:', storedUser);
      const dbResult = await this.UserRepo.updateUser(storedUser);
      if (dbResult == false) return left(new StoreConnectionError());

      const userDTO = createDTOUserFromDomain(dbResult);

      return right(Result.success<DTOUser>(userDTO));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
