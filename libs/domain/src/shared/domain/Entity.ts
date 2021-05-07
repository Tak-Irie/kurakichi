import { UniqueEntityId } from './UniqueEntityId';
import { Identifier } from './Identifier';

/**
 * @constructor public readonly props:T @constructor UniqueEntityId
 * @method equals
 */
const isEntity = (v: unknown): v is Entity<unknown> => v instanceof Entity;

/**
 * オブジェクトの要素型のみを抽出する
 */
export type PropTypes<T> = T[keyof T];

// FIXME:PickやOmitの要領でstring | number | string[] | number[]にしたいが、やりかたわからん
/**
 * オブジェクトの要素型を組込型にする
 */
export type PropPrimitives<T, U extends keyof T> = {
  [P in keyof Omit<T, U>]: string;
};

/**
 * 抽象Entityクラス
 */
export abstract class Entity<T> {
  protected readonly _id: UniqueEntityId;
  private identifier: Identifier;

  constructor(readonly props: T, id?: UniqueEntityId) {
    this._id = id;
    this.props = props;
  }

  public getProps() {
    return this.props;
  }

  public equals(object?: Entity<T> | UniqueEntityId): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.identifier.identifyEntity(object._id, this._id);
  }
}
