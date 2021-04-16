import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { UserEmail } from './UserEmail';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';

interface UserProps {
  id: UniqueEntityId;
  userName: UserName;
  email: UserEmail;
  description: string;
  avatar: string;
  image: string;
  role: 'USER' | 'PRO';
  password: UserPassword;
  ssoSub: string;
  messages: UniqueEntityId[];
  belongSecureBases: UniqueEntityId[];
  belongOrgs: UniqueEntityId[];
}

type UserPrimitive = {
  id: string;
  email: string;
  userName: string;
  avatar: string;
  description: string;
  image: string;
  password: string;
  ssoSub: string;
  role: 'USER' | 'PRO';
  messages: string[];
  belongOrgs: string[];
  belongSecureBases: string[];
};

type UserInitialRegister = 'id' | 'userName' | 'password' | 'email';
type SSOUserInitialRegister = 'id' | 'userName' | 'email' | 'avatar' | 'ssoSub';

export class User extends AggregateRoot<UserProps> {
  private constructor(readonly props: UserProps) {
    super(props);
  }

  getId(): string {
    if (!this.props.id) return "id doesn't exist";
    return this.props.id.getId();
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

  public static create(props: Pick<UserProps, UserInitialRegister>): User {
    const user = new User({
      id: props.id,
      email: props.email,
      userName: props.userName,
      password: props.password,
      ssoSub: 'IT_IS_KURAKICHI_ORIGINAL_USER',
      avatar: 'UNKNOWN',
      description: 'UNKNOWN',
      image: 'UNKNOWN',
      role: 'USER',
      belongOrgs: [],
      belongSecureBases: [],
      messages: [],
    });

    return user;
  }

  public static createSsoUser(props: Pick<UserProps, SSOUserInitialRegister>): User {
    const user = new User({
      id: props.id,
      email: props.email,
      userName: props.userName,
      password: UserPassword.createForSSO(),
      ssoSub: props.ssoSub,
      avatar: props.avatar || 'UNKNOWN',
      description: 'UNKNOWN',
      image: 'UNKNOWN',
      role: 'USER',
      belongOrgs: [],
      belongSecureBases: [],
      messages: [],
    });
    return user;
  }

  public static restoreFromRepo(storedUser: UserPrimitive): User {
    const {
      avatar,
      belongOrgs,
      belongSecureBases,
      description,
      email,
      id,
      image,
      password,
      messages,
      role,
      userName,
      ssoSub,
    } = storedUser;
    const user = new User({
      id: UniqueEntityId.restoreFromRepo(id),
      avatar: avatar,
      description: description,
      email: UserEmail.restoreFromRepo(email),
      image: image,
      password: UserPassword.restoreFromRepo(password),
      role: role,
      ssoSub: ssoSub,
      userName: UserName.restoreFromRepo(userName),
      belongOrgs: UniqueEntityId.restoreArrayFromRepo(belongOrgs),
      belongSecureBases: UniqueEntityId.restoreArrayFromRepo(belongSecureBases),
      messages: UniqueEntityId.restoreArrayFromRepo(messages),
    });
    return user;
  }

  public updateEmail(email: UserEmail): void {
    this.props.email = email;
  }
  public updateDescription(description: string): void {
    this.props.description = description;
  }
  public updateAvatar(avatar: string): void {
    this.props.avatar = avatar;
  }
  public updateImage(image: string): void {
    this.props.image = image;
  }
}
