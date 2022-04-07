import { Result } from "../../shared/core";
import { Entity } from "../../shared/domain";
import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";

interface MemberProps {
  id: UniqueEntityId;
}
export class Member extends Entity<MemberProps> {
  constructor(readonly props: MemberProps) {
    super(props);
  }
  getId(): string {
    return this.props.id.getId();
  }
  public static create(props: MemberProps): Result<Member> {
    const member = new Member({
      ...props,
    });
    // Room.addDomainEvent(new RoomCreated(Room));
    return Result.success<Member>(member);
  }
}
