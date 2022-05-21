import { Result } from "../../shared/core";
import { Entity } from "../../shared/domain";
import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";

interface FellowProps {
  id: UniqueEntityId;
}
export class Fellow extends Entity<FellowProps> {
  constructor(readonly props: FellowProps) {
    super(props);
  }
  getId(): string {
    return this.props.id.getId();
  }
  public static create(props: FellowProps): Result<Fellow> {
    const member = new Fellow({
      ...props,
    });
    // Room.addDomainEvent(new RoomCreated(Room));
    return Result.success<Fellow>(member);
  }
}
