import { Entity } from '../../shared';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Result } from '../../shared/Result';
import { UserEmail, UserName } from '../../user';

interface MemberProps {
  id: UniqueEntityId;
  memberName: UserName;
  email: UserEmail;
}

export class Member extends Entity<MemberProps> {
  constructor(readonly props: MemberProps) {
    super(props);
  }
  public getId(): string {
    return this.props.id.getId();
  }

  public getMemberName(): string {
    return this.props.memberName.getValue();
  }
  public getEmail(): string {
    return this.props.email.getValue();
  }

  public static create(props: MemberProps): Result<Member> {
    const _Member = new Member({
      ...props,
    });
    // Member.addDomainEvent(new _EntityCreated(Member));
    return Result.success<Member>(_Member);
  }
}
