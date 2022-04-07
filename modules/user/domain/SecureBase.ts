import { Result } from "../../shared/core";
import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";

interface SecureBaseProps {
  id: UniqueEntityId;
  baseOwner: UniqueEntityId;
  members: UniqueEntityId[];
}

type SecureBaseRaw = {
  id: string;
  baseOwner: string;
  members: string[];
};

export class SecureBase extends AggregateRoot<SecureBaseProps> {
  private constructor(readonly props: SecureBaseProps) {
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

  public static restoreFromRepo(secureBase: SecureBaseRaw): SecureBase {
    return new SecureBase({
      id: UniqueEntityId.restoreFromRepo({ id: secureBase.id }),
      baseOwner: UniqueEntityId.restoreFromRepo({ id: secureBase.baseOwner }),
      members: UniqueEntityId.restoreArrayFromRepo(
        secureBase.members.map((id) => {
          return { id };
        })
      ),
    });
  }
}
