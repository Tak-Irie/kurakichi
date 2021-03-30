import { Entity } from '../../shared';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Result } from '../../shared/Result';

interface MemberProps {
  id: UniqueEntityId;
}

export class Member extends Entity<MemberProps> {
  constructor(readonly props: MemberProps) {
    super(props);
  }
  public getId(): string {
    return this.props.id.getId();
  }
  public static create(props: MemberProps): Result<Member> {
    const _Member = new Member({
      ...props,
    });
    // Member.addDomainEvent(new _EntityCreated(Member));
    return Result.success<Member>(_Member);
  }
}
