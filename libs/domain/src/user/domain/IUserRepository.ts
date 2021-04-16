import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { User } from './User';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';

export interface IUserRepository {
  confirmExistence(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: UniqueEntityId): Promise<User | undefined>;
  registerUser(user: User): Promise<User | undefined>;
  getUsers(): Promise<User[] | false>;
  getUserByEmail(userEmail: UserEmail): Promise<User | undefined>;
  deleteUser(userId: UniqueEntityId): Promise<boolean>;
  changeUserPassword(userId: UniqueEntityId, password: UserPassword): Promise<boolean>;
  updateUser(user: User): Promise<User | false>;
}
