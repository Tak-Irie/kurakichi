import { ulid } from "ulid";
import { v4 as uuidV4 } from "uuid";

import { ValueObject } from "./ValueObject";

type UniqueEntityIdProps = {
  id: string;
};
export class UniqueEntityId extends ValueObject<UniqueEntityIdProps> {
  private constructor(props: UniqueEntityIdProps) {
    super(props);
  }
  static createULID() {
    return new UniqueEntityId({ id: ulid() });
  }
  static createUUIDv4() {
    return new UniqueEntityId({ id: uuidV4() });
  }

  public getId() {
    return this.props.id;
  }
  public static restoreFromRepo(props: UniqueEntityIdProps) {
    return new UniqueEntityId(props);
  }
  public static restoreArrayFromRepo(arrayProps: UniqueEntityIdProps[]) {
    return arrayProps.map((props) => new UniqueEntityId(props));
  }
}
