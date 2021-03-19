import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Result } from '../../../shared/Result';
import { Member } from './Member';

interface RoomProps {
  id: UniqueEntityId;
  member: Member[];
}

export class Room extends AggregateRoot<RoomProps> {
  constructor(readonly props: RoomProps) {
    super(props);
  }

  getId(): string {
    if (!this.props.id) return "id doesn't exist";
    return this.props.id.getId();
  }

  public static create(props: RoomProps): Result<Room> {
    const user = new Room({
      ...props,
    });
    // user.addDomainEvent(new UserCreated(user));

    return Result.success<Room>(user);
  }
}
