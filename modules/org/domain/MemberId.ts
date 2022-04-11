import { Result } from "../../shared/core";
import { Entity, UniqueEntityId } from "../../shared/domain";

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
