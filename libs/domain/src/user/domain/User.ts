import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Result } from '../../../shared/Result';
// import { UserCreated } from './events/UserCreated';
import { UserEmail } from './UserEmail';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';

interface UserProps {
  id: UniqueEntityId;
  username: UserName;
  email: UserEmail;
  password?: UserPassword;
  ssoSub?: string;
  picture?: string;
  // role: "USER" | "ADMIN";
  // // isEmailVerified: boolean;
  // profilePicture?: string;
  // firstName?: string;
  // lastName?: string;
}

export class User extends AggregateRoot<UserProps> {
  constructor(readonly props: UserProps) {
    super(props);
  }

  getId(): string {
    if (!this.props.id) return "id doesn't exist";
    return this.props.id.getId();
  }

  getUsername(): string {
    return this.props.username.getValue();
  }

  getEmail(): string {
    return this.props.email.getValue();
  }

  getPassword(): string | undefined {
    if (this.props.password === undefined) return undefined;
    return this.props.password.getValue();
  }

  public static create(props: UserProps): Result<User> {
    const user = new User({
      ...props,
    });
    // user.addDomainEvent(new UserCreated(user));

    return Result.success<User>(user);
  }
}
