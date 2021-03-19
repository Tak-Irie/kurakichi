import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Result } from '../../../shared/Result';
import { Entity } from '../../../shared/domain/Entity';

type MemberProps = {
  id: UniqueEntityId;
};

export class Member extends Entity<MemberProps> {
  public static create(props: MemberProps): Result<Member> {
    const member = new Member(props);

    return Result.success<Member>(member);
  }
}
