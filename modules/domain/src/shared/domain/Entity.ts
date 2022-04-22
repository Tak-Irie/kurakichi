import { UniqueEntityId } from "./UniqueEntityId";

const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity;
};

export type PropPrimitives<TYPE, PROP extends keyof TYPE> = {
  [KEY in keyof Omit<TYPE, PROP>]: string;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityId;
  public readonly props: T;

  constructor(props: T, id?: UniqueEntityId) {
    this._id = id ? id : UniqueEntityId.createULID();
    this.props = props;
  }

  public getProps() {
    return this.props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
