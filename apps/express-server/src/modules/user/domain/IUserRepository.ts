import { User } from './User';
import { UserEmail } from './UserEmail';

export interface IUserRepository {
  confirmExistence(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User | unknown>;
  registerUser(user: User): Promise<boolean>;
  getUsers(): Promise<User[] | undefined>;
}
