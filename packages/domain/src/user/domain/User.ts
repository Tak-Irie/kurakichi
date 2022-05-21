import { UniqueEntityId } from '../../shared/domain';
import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { UserEmail } from './UserEmail';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';

interface UserProps {
  id: UniqueEntityId;
  userName: UserName;
  email: UserEmail;
  selfIntro: string;
  avatarUrl: string;
  heroImageUrl: string;
  role: 'VISITOR' | 'EXPERT' | 'CLIENT';
  password: UserPassword;
  ssoSub: string;
  messages: UniqueEntityId[];
  belongBases: UniqueEntityId[];
  belongOrgs: UniqueEntityId[];
}

type UserPrimitive = {
  id: string;
  email: string;
  userName: string;
  avatarUrl: string;
  selfIntro: string;
  heroImageUrl: string;
  password: string;
  ssoSub: string;
  role: 'VISITOR' | 'EXPERT' | 'CLIENT';
  messages: string[];
  belongOrgs: string[];
  belongBases: string[];
};

type UserInitialRegister = 'id' | 'userName' | 'password' | 'email';
type SSOUserInitialRegister =
  | 'id'
  | 'userName'
  | 'email'
  | 'avatarUrl'
  | 'ssoSub';

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
      avatarUrl: 'UNKNOWN',
      selfIntro: 'UNKNOWN',
      heroImageUrl: 'UNKNOWN',
      role: 'VISITOR',
      belongOrgs: [],
      belongBases: [],
      messages: [],
    });

    return user;
  }

  public static createSsoUser(
    props: Pick<UserProps, SSOUserInitialRegister>,
  ): User {
    const user = new User({
      id: props.id,
      email: props.email,
      userName: props.userName,
      password: UserPassword.createForSSO(),
      ssoSub: props.ssoSub,
      avatarUrl: props.avatarUrl || 'UNKNOWN',
      selfIntro: 'UNKNOWN',
      heroImageUrl: 'UNKNOWN',
      role: 'VISITOR',
      belongOrgs: [],
      belongBases: [],
      messages: [],
    });
    return user;
  }

  public static restoreFromRepo(storedUser: UserPrimitive): User {
    const {
      avatarUrl,
      belongOrgs,
      belongBases,
      selfIntro,
      email,
      id,
      heroImageUrl,
      password,
      messages,
      role,
      userName,
      ssoSub,
    } = storedUser;
    const user = new User({
      id: UniqueEntityId.restoreFromRepo({ id }),
      avatarUrl: avatarUrl,
      selfIntro: selfIntro,
      email: UserEmail.restoreFromRepo(email),
      heroImageUrl: heroImageUrl,
      password: UserPassword.restoreFromRepo(password),
      role: role,
      ssoSub: ssoSub,
      userName: UserName.restoreFromRepo(userName),
      belongOrgs: UniqueEntityId.restoreArrayFromRepo(
        belongOrgs.map((id) => {
          return { id };
        }),
      ),
      belongBases: UniqueEntityId.restoreArrayFromRepo(
        belongBases.map((id) => {
          return { id };
        }),
      ),
      messages: UniqueEntityId.restoreArrayFromRepo(
        messages.map((id) => {
          return { id };
        }),
      ),
    });
    return user;
  }

  public updateEmail(email: string): void | string {
    const result = UserEmail.create({ email });
    if (result.isFailure) return result.getErrorValue();
    this.props.email = result.getValue();
  }

  public updateUserName(userName: string): void | string {
    const result = UserName.create({ userName });
    if (result.isFailure) return result.getErrorValue();
    this.props.userName = result.getValue();
  }

  public updateDescription(selfIntro: string): void {
    this.props.selfIntro = selfIntro;
  }

  public updateAvatar(avatarUrl: string): void {
    this.props.avatarUrl = avatarUrl;
  }

  public updateImage(heroImageUrl: string): void {
    this.props.heroImageUrl = heroImageUrl;
  }
}
