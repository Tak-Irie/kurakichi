import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";
import { Base } from "./Base";

export interface IBaseRepo {
  getBase(baseId: UniqueEntityId): Promise<Base | false>;
  registerBase(base: Base): Promise<Base | false>;
}
