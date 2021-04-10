import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Result } from '../../shared/Result';

interface DialogRoomProps {
  id: UniqueEntityId;
  roomOwner: UniqueEntityId;
  members: UniqueEntityId[];
}

export class DialogRoom extends AggregateRoot<DialogRoomProps> {
  constructor(readonly props: DialogRoomProps) {
    super(props);
  }

  public getId(): string {
    if (!this.props.id) return "id doesn't exist";
    return this.props.id.getId();
  }

  public getRoomOwner(): UniqueEntityId {
    return this.props.roomOwner;
  }

  public getMembers(): UniqueEntityId[] {
    return this.props.members;
  }

  public static create(props: DialogRoomProps): Result<DialogRoom> {
    const room = new DialogRoom({
      ...props,
    });
    // DialogRoom.addDomainEvent(new RoomCreated(DialogRoom));

    return Result.success<DialogRoom>(room);
  }
}
