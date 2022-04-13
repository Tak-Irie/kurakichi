import { Nothing, Result } from "../../shared/core";
import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";
import { Karte } from "./Karte";

interface BaseProps {
  id: UniqueEntityId;
  baseOwner: UniqueEntityId;
  karte: Karte | Nothing;
  dialogs: UniqueEntityId[] | Nothing;
  fellows: UniqueEntityId[];
}

type BaseRaw = {
  id: string;
  baseOwner: string;
  fellows: string[];
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

  public getFellows(): UniqueEntityId[] {
    return this.props.fellows;
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
      fellows: UniqueEntityId.restoreArrayFromRepo(
        secureBase.fellows.map((id) => {
          return { id };
        })
      ),
      karte: "",
      dialogs: "",
    });
  }
}
