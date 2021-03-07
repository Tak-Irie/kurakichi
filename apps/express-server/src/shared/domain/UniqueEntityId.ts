import { ulid } from 'ulid';
export class UniqueEntityId {
  public id: string;

  constructor(id?: string) {
    if (id) this.id = id;
  }

  public static create(): UniqueEntityId {
    return new UniqueEntityId(ulid());
  }

  public getId(): string {
    return this.id;
  }
}
