import { ulid } from 'ulid';
import { Result } from '../Result';
export class UniqueEntityId {
  private id: string;
  private constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public static create(): UniqueEntityId {
    return new UniqueEntityId(ulid());
  }

  public static restoreFromRepo(id: string): UniqueEntityId {
    return new UniqueEntityId(id);
  }

  public static restoreArrayFromRepo(ids: string[]): UniqueEntityId[] {
    return ids.map((id) => this.restoreFromRepo(id));
  }

  public static reconstruct(id: string): Result<UniqueEntityId> {
    const idReg = /[0-9A-Z]{26}/;
    const result = idReg.exec(id);

    if (id === result[0]) {
      return Result.success<UniqueEntityId>(new UniqueEntityId(id));
    }
    return Result.fail<UniqueEntityId>('IDが不正な値です');
  }
}
