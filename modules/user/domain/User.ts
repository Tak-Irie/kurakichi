import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../shared/domain/UniqueEntityID";
import { UserEmail } from "./UserEmail";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

interface UserProps {
  id: UniqueEntityID;
  userName: UserName;
  email: UserEmail;
  password: UserPassword;
}
interface UserPrimitiveProps {
  id: string;
  userName: string;
  email: string;
  password: string;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(readonly props: UserProps) {
    super(props);
  }

  getId(): string {
    if (!this.props.id) return "id doesn't exist";
    return this.props.id.toString();
  }

  getUsername(): string {
    return this.props.userName.getValue();
  }

  getEmail(): string {
    return this.props.email.getValue();
  }

  getPassword(): string | undefined {
    if (this.props.password === undefined) return undefined;
    return this.props.password.getValue();
  }

  public static create(props: UserProps): User {
    const user = new User({
      id: props.id,
      email: props.email,
      userName: props.userName,
      password: props.password,
    });

    return user;
  }

  public static restore(props: UserPrimitiveProps): User {
    const { email, id, password, userName } = props;
    const user = new User({
      id: new UniqueEntityID(id),
      email: UserEmail.restoreFromRepo(email),
      password: UserPassword.restoreFromRepo(password),
      userName: UserName.restoreFromRepo(userName),
    });
    return user;
  }
}
