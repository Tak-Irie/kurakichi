import { Result } from "../../shared/core";
import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";

interface BaseProps {
  id: UniqueEntityId;
  baseOwner: UniqueEntityId;
  members: UniqueEntityId[];
}

type BaseRaw = {
  id: string;
  baseOwner: string;
  members: string[];
};

export class Base extends AggregateRoot<BaseProps> {
  private constructor(readonly props: BaseProps) {
    super(props);
  }

  public getId(): string {
    if (!this.props.id) return "id doesn't exist";
    return this.props.id.getId();
  }

  public getBaseOwner(): UniqueEntityId {
    return this.props.baseOwner;
  }

  public getMembers(): UniqueEntityId[] {
    return this.props.members;
  }

  public static create(props: BaseProps): Result<Base> {
    const base = new Base({
      ...props,
    });
    // Base.addDomainEvent(new RoomCreated(Base));

    return Result.success<Base>(base);
  }

  public static restoreFromRepo(secureBase: BaseRaw): Base {
    return new Base({
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
