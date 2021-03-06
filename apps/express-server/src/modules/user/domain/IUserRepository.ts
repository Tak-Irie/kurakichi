import { User } from './User';
import { UserEmail } from './UserEmail';

export interface IUserRepository {
  confirmExistence(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User | undefined>;
  registerUser(user: User): Promise<boolean>;
  getUsers(): Promise<User[] | undefined>;
  getUserByEmail(userEmail: UserEmail): Promise<User | undefined>;
}
