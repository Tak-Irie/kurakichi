import { ulid } from 'ulid';
export class UniqueEntityId {
  public id: string;

  constructor(id?: string) {
    const idReg = /[0-9A-Z]{26}/;
    const result = idReg.exec(id);

    if (id && id === result[0]) this.id = id;
  }

  public static create(): UniqueEntityId {
    return new UniqueEntityId(ulid());
  }

  public getId(): string {
    return this.id;
  }
}
