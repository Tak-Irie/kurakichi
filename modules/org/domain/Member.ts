import { Result } from "../../shared/core";
import { Entity } from "../../shared/domain";
import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";
import { UserEmail, UserName } from "../../user/domain";

// FIXME:Don't use User VO
interface MemberProps {
  id: UniqueEntityId;
  memberName: UserName;
  email: UserEmail;
}

export type MemberPrimitive = {
  id: string;
  memberName: string;
  email: string;
};

export class Member extends Entity<MemberProps> {
  private constructor(readonly props: MemberProps) {
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
  public static restoreFromRepo(member: MemberPrimitive): Member {
    const { email, id, memberName } = member;
    return new Member({
      id: UniqueEntityId.restoreFromRepo({ id }),
      email: UserEmail.restoreFromRepo(email),
      memberName: UserName.restoreFromRepo(memberName),
    });
  }
}
