import { ulid } from "ulid";
import { v4 as uuidV4 } from "uuid";
import { Guard, Result } from "../core";
import { ULIDRegExp } from "../util";

import { ValueObject } from "./ValueObject";

type UniqueEntityIdProps = {
  id: string;
};
export class UniqueEntityId extends ValueObject<UniqueEntityIdProps> {
  private constructor(props: UniqueEntityIdProps) {
    super(props);
  }
  public static createULID() {
    return new UniqueEntityId({ id: ulid() });
  }
  public static createUUIDv4() {
    return new UniqueEntityId({ id: uuidV4() });
  }

  public getId() {
    return this.props.id;
  }

  public static createFromArg(props: UniqueEntityIdProps) {
    const length = Guard.againstAtMost(26, props.id);
    if (length.succeeded === false) {
      return false;
    }
    if (ULIDRegExp.test(props.id) === false) {
      return false;
    }
    return new UniqueEntityId(props);
  }

  public static restoreFromRepo(props: UniqueEntityIdProps) {
    return new UniqueEntityId(props);
  }
  public static restoreArrayFromRepo(arrayProps: UniqueEntityIdProps[]) {
    return arrayProps.map((props) => new UniqueEntityId(props));
  }
}
