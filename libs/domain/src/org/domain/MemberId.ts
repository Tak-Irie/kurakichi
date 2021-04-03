import { Entity, Result, UniqueEntityId } from '../../shared';

export class MemberId extends Entity<unknown> {
  private constructor(id?: UniqueEntityId) {
    super(null, id);
  }

  getId(): string {
    return this._id.getId();
  }

  public static create(id?: UniqueEntityId): Result<MemberId> {
    return Result.success<MemberId>(new MemberId(id));
  }
}
