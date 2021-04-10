import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Result } from '../../shared/Result';

interface SecureBaseProps {
  id: UniqueEntityId;
  baseOwner: UniqueEntityId;
  members: UniqueEntityId[];
}

export class SecureBase extends AggregateRoot<SecureBaseProps> {
  constructor(readonly props: SecureBaseProps) {
    super(props);
  }

  public getId(): string {
    if (!this.props.id) return "id doesn't exist";
    return this.props.id.getId();
  }

  public getRoomOwner(): UniqueEntityId {
    return this.props.baseOwner;
  }

  public getMembers(): UniqueEntityId[] {
    return this.props.members;
  }

  public static create(props: SecureBaseProps): Result<SecureBase> {
    const base = new SecureBase({
      ...props,
    });
    // SecureBase.addDomainEvent(new RoomCreated(SecureBase));

    return Result.success<SecureBase>(base);
  }
}
