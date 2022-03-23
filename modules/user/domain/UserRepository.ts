import { UniqueEntityID } from "../../shared/domain/UniqueEntityID";
import { User } from "./User";
import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";

export interface UserRepository {
  registerUser(user: User): Promise<boolean>;
  getUsers(): Promise<User[]>;
}
